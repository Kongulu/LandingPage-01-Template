import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookmarkConverter from "@/components/BookmarkConverter";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="py-10">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Bookmark Converter Tool</h1>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Convert your bookmarks between different browser formats with our easy-to-use online tool
          </p>
          
          <BookmarkConverter />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}