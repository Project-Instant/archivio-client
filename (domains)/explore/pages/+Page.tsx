import { Link } from "@/shared/components/link/Link";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { ChevronRight, Globe, Heart, Map, Search, Star, Users } from "lucide-react";

const testimonials = [
  {
    quote:
      "Wanderlust completely changed how I plan my trips. I've discovered so many amazing places I would have never found otherwise.",
    author: "Emma Thompson",
    location: "London, UK",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "The curated collections saved me hours of research. I found the perfect off-the-beaten-path experiences for my Japan trip.",
    author: "Michael Chen",
    location: "Toronto, Canada",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    quote:
      "As a solo female traveler, I appreciate the detailed insights from other women who've visited the same destinations. It's like having a friend everywhere.",
    author: "Sofia Rodriguez",
    location: "Barcelona, Spain",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

const places = [
  {
    title: "Kyoto, Japan",
    image: "/placeholder.svg?height=500&width=400",
    saves: "12.5k",
  },
  {
    title: "Santorini, Greece",
    image: "/placeholder.svg?height=500&width=400",
    saves: "10.2k",
  },
  {
    title: "Bali, Indonesia",
    image: "/placeholder.svg?height=500&width=400",
    saves: "9.8k",
  },
  {
    title: "Marrakech, Morocco",
    image: "/placeholder.svg?height=500&width=400",
    saves: "8.3k",
  },
  {
    title: "Tulum, Mexico",
    image: "/placeholder.svg?height=500&width=400",
    saves: "7.9k",
  },
]

const features = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Discover",
    description:
      "Find hidden gems and popular destinations curated by our community of passionate travelers.",
  },
  {
    icon: <Map className="h-8 w-8" />,
    title: "Plan",
    description:
      "Create personalized itineraries, save your favorite spots, and organize your perfect trip.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Connect",
    description:
      "Share your experiences and get inspired by a global community of like-minded adventurers.",
  },
]

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <section className="relative h-[80vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1743623930275-abbb3ad3be0b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Breathtaking travel destination"
          className="object-cover w-full h-full filter grayscale"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-tight">
            Discover the world's hidden treasures
          </h1>
          <p className="mt-4 md:mt-6 text-lg md:text-xl max-w-2xl">
            Curate your perfect journey with inspiration from travelers around the globe
          </p>
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Where to next?"
                className="w-full pl-10 bg-white/90 border-none h-12 text-black"
              />
            </div>
            <Button className="h-12 px-6 bg-black text-white border border-white hover:bg-white hover:text-black transition-colors">
              Explore
            </Button>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Trending Destinations</h2>
              <p className="mt-2 text-gray-600 max-w-2xl">
                Discover the most popular places travelers are adding to their wishlists right now
              </p>
            </div>
            <Link
              href="/explore"
              className="mt-4 md:mt-0 flex items-center text-sm font-medium hover:underline underline-offset-4"
            >
              View all destinations
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 space-x-4 scrollbar-hide">
            {places.map((destination, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] md:w-[320px] group cursor-pointer">
                <div className="relative h-[400px] overflow-hidden rounded-xl">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.title}
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-bold text-xl">{destination.title}</h3>
                    <div className="flex items-center mt-2">
                      <Heart className="h-4 w-4 mr-2 fill-white" />
                      <span>{destination.saves} saves</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Travel smarter, not harder</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our platform helps you discover, plan, and share your travel experiences with ease
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-8">
            {features.map((feature, index) => (
              <div key={index} className="flex-1 flex flex-col items-center text-center px-4">
                <div className="h-16 w-16 flex items-center justify-center rounded-full bg-black text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What travelers are saying</h2>
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-1 bg-gray-50 p-8 rounded-xl relative">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-black" />
                  ))}
                </div>
                <p className="italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full mr-4 filter grayscale"
                  />
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            {[
              { number: "10M+", label: "Travelers" },
              { number: "150+", label: "Countries" },
              { number: "500K+", label: "Destinations" },
              { number: "5M+", label: "Photos Shared" },
            ].map((stat, index) => (
              <div key={index} className="flex-1 text-center mb-8 md:mb-0">
                <p className="text-4xl md:text-5xl font-bold">{stat.number}</p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1745276242272-18e54ab3c4b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Travel inspiration"
            className="object-cover w-full h-full filter grayscale"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Start your journey today</h2>
            <p className="text-lg md:text-xl mb-8">
              Join our community of passionate travelers and discover your next adventure
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="h-12 px-8 bg-white text-black hover:bg-gray-200">Sign up now</Button>
              <Button variant="outline" className="h-12 px-8 text-white border-white hover:bg-white/10">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get travel inspiration delivered to your inbox</h2>
            <p className="text-gray-600 mb-8">
              Sign up for our newsletter to receive personalized destination recommendations and travel tips
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input type="email" placeholder="Enter your email" className="h-12 flex-1" required />
              <Button type="submit" className="h-12 px-6 bg-black text-white hover:bg-gray-800">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </section>
      <footer className="bg-black text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <div className="mb-8 md:mb-0">
              <Link href="/" className="text-2xl font-bold tracking-tighter">
              Archivio
              </Link>
              <p className="mt-4 text-gray-400 max-w-xs">
                Discover the world's hidden treasures and plan your next adventure with our community of travelers.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex flex-wrap -mx-4">
              <div className="w-1/2 md:w-auto px-4 mb-8 md:mb-0">
                <h3 className="font-semibold text-lg mb-4">Explore</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Destinations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Collections
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Travel Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Experiences
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 md:w-auto px-4 mb-8 md:mb-0">
                <h3 className="font-semibold text-lg mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 md:w-auto px-4 mb-8 md:mb-0">
                <h3 className="font-semibold text-lg mb-4">Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Safety Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 md:w-auto px-4">
                <h3 className="font-semibold text-lg mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Archivio. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-gray-400" />
                <select className="bg-transparent text-gray-400 text-sm border-none focus:ring-0">
                  <option value="en">English (US)</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}