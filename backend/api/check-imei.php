<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'verdict' => 'error',
        'message' => 'Invalid request method'
    ]);
    exit;
}

// 🔹 Get input
$data = json_decode(file_get_contents('php://input'), true);
$modelInput = strtolower(trim($data['input'] ?? ''));

if (empty($modelInput)) {
    echo json_encode([
        'status' => 'error',
        'verdict' => 'error',
        'message' => 'Please enter a phone model name'
    ]);
    exit;
}

// 🔹 Remove common brand names
$brands = [
    'samsung', 'iphone', 'apple', 'infinix', 'tecno', 'itel',
    'xiaomi', 'redmi', 'oppo', 'vivo', 'nokia', 'huawei'
];

$modelOnly = $modelInput;

foreach ($brands as $brand) {
    $modelOnly = str_replace($brand, '', $modelOnly);
}

$modelOnly = trim($modelOnly);

// 🔹 Split into words
$words = array_filter(explode(" ", $modelOnly));

// 🔹 If no words left, fallback to original input
if (empty($words)) {
    $words = array_filter(explode(" ", $modelInput));
}

// =======================================================
// 🔥 PRIMARY QUERY (STRICT MATCH: ALL WORDS MUST EXIST)
// =======================================================

$whereParts = [];
$params = [];
$types = "";

foreach ($words as $word) {
    $whereParts[] = "(LOWER(models) LIKE ? OR LOWER(equipment_name) LIKE ?)";
    $params[] = "%$word%";
    $params[] = "%$word%";
    $types .= "ss";
}

$whereClause = implode(" AND ", $whereParts);

$sql = "SELECT * FROM ncc_approved 
        WHERE $whereClause
        ORDER BY id DESC 
        LIMIT 1";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        'status' => 'error',
        'verdict' => 'error',
        'message' => 'Database error (prepare failed)'
    ]);
    exit;
}

$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

// =======================================================
// 🔄 FALLBACK QUERY (LOOSE MATCH: ANY WORD MATCHES)
// =======================================================

if ($result->num_rows === 0) {

    $whereParts = [];
    $params = [];
    $types = "";

    foreach ($words as $word) {
        $whereParts[] = "(LOWER(models) LIKE ? OR LOWER(equipment_name) LIKE ?)";
        $params[] = "%$word%";
        $params[] = "%$word%";
        $types .= "ss";
    }

    $whereClause = implode(" OR ", $whereParts);

    $sql = "SELECT * FROM ncc_approved 
            WHERE $whereClause
            ORDER BY id DESC 
            LIMIT 1";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
}

// =======================================================
// 🎯 RESPONSE
// =======================================================

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    echo json_encode([
        'status' => 'success',
        'verdict' => 'genuine',
        'message' => 'This model is NCC Approved ✅',
        'brand' => $row['manufacturer'],
        'model' => $row['models'],
        'equipment_name' => $row['equipment_name'],
        'applicant' => $row['applicant'],
        'last_updated' => $row['last_updated']
    ]);

} else {
    echo json_encode([
        'status' => 'warning',
        'verdict' => 'suspicious',
        'message' => 'This model was NOT found in the NCC Approved list. It might be a new release, grey import, or fake. Be careful!'
    ]);
}

$stmt->close();
$conn->close();
?>