import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ApiPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100">
        API Data
      </h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-5 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-colors duration-300"
        aria-label="Search posts"
      />

      {loading && (
        <p className="text-gray-500 dark:text-gray-400 text-center text-lg animate-pulse">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center text-lg font-semibold">{error}</p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <Card
            key={post.id}
            className="transition-transform hover:scale-[1.02] hover:shadow-lg duration-300"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                Post #{post.id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {post.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
