// ===== app/page.js =====
'use client'
import React, { useState, useEffect } from 'react';
import { Plus, Search, Star, Users, Clock, Play, Check, X, Heart, MessageCircle, Share2, Bell, Settings } from 'lucide-react';

export default function StreamingTracker() {
  const [activeTab, setActiveTab] = useState('watching');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [watchingList, setWatchingList] = useState([
    {
      id: 1,
      title: "The Bear",
      service: "Hulu",
      season: 3,
      episode: 5,
      totalSeasons: 3,
      totalEpisodes: 28,
      watchingWith: "Sarah",
      myRating: 5,
      genre: "Comedy/Drama",
      nextEpisode: "Tomorrow",
      image: "🐻",
      status: "watching"
    },
    {
      id: 2,
      title: "House of the Dragon",
      service: "HBO Max",
      season: 2,
      episode: 3,
      totalSeasons: 2,
      totalEpisodes: 18,
      watchingWith: "Solo",
      myRating: 4,
      genre: "Fantasy/Drama",
      nextEpisode: "Sunday",
      image: "🐉",
      status: "watching"
    }
  ]);

  const [friendsActivity, setFriendsActivity] = useState([
    { user: "Sarah", action: "finished", show: "Ted Lasso", rating: 5, time: "2h ago" },
    { user: "Mike", action: "started", show: "The Witcher", rating: null, time: "5h ago" },
    { user: "Emma", action: "rated", show: "Stranger Things", rating: 4, time: "1d ago" }
  ]);

  const services = ["Netflix", "Hulu", "HBO Max", "Disney+", "Apple TV+", "Prime Video", "Paramount+", "Other"];

  const AddShowModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Show or Movie</h2>
          <button 
            onClick={() => setShowAddModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search for show/movie</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Start typing..."
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Streaming Service</label>
            <select className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select service...</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Watching with</label>
            <input 
              type="text"
              placeholder="Solo, or friend's name"
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Season</label>
              <input 
                type="number"
                placeholder="1"
                min="1"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Episode</label>
              <input 
                type="number"
                placeholder="1"
                min="1"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => setShowAddModal(false)}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            Add Show
          </button>
        </div>
      </div>
    </div>
  );

  const ShowCard = ({ show }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{show.image}</div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{show.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                {show.service}
              </span>
              <span>•</span>
              <span>{show.genre}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < show.myRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">S{show.season}E{show.episode} of {show.totalEpisodes} episodes</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((show.season - 1) * 10 + show.episode) / show.totalEpisodes * 100}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} />
            <span>With {show.watchingWith}</span>
          </div>
          {show.nextEpisode && (
            <div className="flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <Bell size={14} />
              <span>Next: {show.nextEpisode}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors text-sm font-medium">
          <Play size={16} />
          Watch Next
        </button>
        <button className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium">
          <Check size={16} />
        </button>
      </div>
    </div>
  );

  const FriendActivity = ({ activity }) => (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium">
        {activity.user[0]}
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{activity.user}</span>
          <span className="text-gray-600"> {activity.action} </span>
          <span className="font-medium">{activity.show}</span>
        </p>
        <div className="flex items-center gap-2 mt-1">
          {activity.rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < activity.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
          )}
          <span className="text-xs text-gray-500">{activity.time}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">What Are We Watching</h1>
              <p className="text-gray-600 text-sm">Track, share, and discover your streaming journey</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                L
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Plus size={20} />
                Add Show or Movie
              </button>
              <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-all duration-200 hover:scale-105 shadow-lg">
                <Users size={20} />
                See What Friends Are Watching
              </button>
              <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-all duration-200 hover:scale-105 shadow-lg">
                <Star size={20} />
                Write a Review
              </button>
            </div>

            {/* Currently Watching */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Currently Watching</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>{watchingList.length} active shows</span>
                </div>
              </div>
              
              <div className="grid gap-4">
                {watchingList.map(show => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Friends Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                Friends Activity
              </h3>
              <div className="space-y-2">
                {friendsActivity.map((activity, i) => (
                  <FriendActivity key={i} activity={activity} />
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors text-sm font-medium">
                See all activity
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shows completed this month</span>
                  <span className="font-bold text-2xl text-green-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Hours watched</span>
                  <span className="font-bold text-2xl text-blue-600">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average rating</span>
                  <span className="font-bold text-2xl text-yellow-600">4.2</span>
                </div>
              </div>
            </div>

            {/* Trending */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4">Trending with Friends</h3>
              <div className="space-y-3">
                {["The Bear", "House of the Dragon", "Only Murders in the Building"].map((show, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="font-medium">{show}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && <AddShowModal />}
    </div>
  );
}