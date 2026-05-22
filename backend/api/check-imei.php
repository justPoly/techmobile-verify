<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method'
    ]);
    exit;
}

// ================= INPUT =================
$data = json_decode(file_get_contents('php://input'), true);
$input = strtolower(trim($data['input'] ?? ''));

if (!$input) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Enter a phone model'
    ]);
    exit;
}

// ================= BRANDS =================
$brands = [
    'samsung','apple','iphone','infinix','tecno','itel',
    'xiaomi','redmi','oppo','vivo','nokia','huawei'
];

$noiseWords = ['ultra','pro','plus','max','5g','new'];

// ================= DETECT BRAND =================
$detectedBrand = null;

foreach ($brands as $b) {
    if (str_contains($input, $b)) {
        $detectedBrand = $b;
        break;
    }
}

// ================= CLEAN QUERY =================
$clean = str_replace($brands, '', $input);
$clean = str_replace($noiseWords, '', $clean);
$clean = trim(preg_replace('/\s+/', ' ', $clean));

// fallback words
$words = array_filter(explode(' ', $clean ?: $input));

// ================= 1. EXACT MATCH (BEST) =================
$sql = "SELECT * FROM ncc_approved WHERE LOWER(models) = ? LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $input);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        'status' => 'success',
        'verdict' => 'genuine',
        'message' => 'Exact match found ✅',
        'data' => $result->fetch_assoc()
    ]);
    exit;
}

// ================= 2. BUILD QUERY =================
$where = [];
$params = [];
$types = "";

// brand lock (VERY IMPORTANT)
if ($detectedBrand) {
    $where[] = "LOWER(manufacturer) = ?";
    $params[] = $detectedBrand;
    $types .= "s";
}

// word matching
foreach ($words as $w) {
    $where[] = "(LOWER(models) LIKE ? OR LOWER(equipment_name) LIKE ?)";
    $params[] = "%$w%";
    $params[] = "%$w%";
    $types .= "ss";
}

// strict mode first
$whereClause = implode(" AND ", $where);

$sql = "SELECT * FROM ncc_approved WHERE $whereClause LIMIT 1";
$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

// ================= 3. FALLBACK (LOOSE) =================
if ($result->num_rows === 0) {

    $whereClause = implode(" OR ", $where);

    $sql = "SELECT * FROM ncc_approved WHERE $whereClause LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
}

// ================= RESPONSE =================
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    echo json_encode([
        'status' => 'success',
        'verdict' => 'genuine',
        'message' => 'Device found in NCC database ✅',
        'data' => $row
    ]);
} else {
    echo json_encode([
        'status' => 'warning',
        'verdict' => 'suspicious',
        'message' => 'Device not found in NCC database'
    ]);
}

$stmt->close();
$conn->close();
?>