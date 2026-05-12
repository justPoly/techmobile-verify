import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function BlogPage() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://techmobile.com.ng/wp-json/wp/v2/posts?_embed&per_page=8"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const data = await response.json();

        const formattedPosts = data.map((post) => ({
          id: post.id,
          title: decodeHTML(post.title.rendered),
          excerpt: decodeHTML(
            post.excerpt.rendered.replace(/<[^>]+>/g, "")
          ),
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/600x400?text=TechMobile",
          date: new Date(post.date).toLocaleDateString(),
          link: post.link,
        }));

        setPosts(formattedPosts);
      } catch (err) {
        console.error(err);
        setError("Unable to load blog posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
            >
              <div className="aspect-video bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl px-6 py-4 text-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Latest Articles
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Fresh updates from TechMobile NG
          </p>
        </div>

        <a
          href="https://www.techmobile.com.ng"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm font-semibold hover:underline"
        >
          Visit Blog
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4">
              <p className="text-xs text-gray-400 mb-2">{post.date}</p>

              <h2 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>

              <p className="text-xs text-gray-500 mt-3 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
