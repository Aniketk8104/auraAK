import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Gift,
  Trophy,
  Eye,
  Copy,
  Star,
  Shield,
  Crown,
  Zap,
  Target,
  Award,
  Briefcase,
  GraduationCap,
  Building,
  Flame,
  Timer,
  Bell,
  Sparkles,
  TrendingUp,
  Lock,
  DollarSign,
  Rocket,
  Bolt,
  ChevronRight,
  Share2,
  Mail,
  MessageSquare,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  AlertCircle,
  CheckCircle,
  Clock,
  PieChart,
  BarChart2,
  Activity,
  Coffee,
  Smile,
  Frown,
  Meh,
  Info, // Add this import
} from "lucide-react";
const AuraReferralProgram = () => {
  // Enhanced user data with more engagement metrics
  const [userData, setUserData] = useState({
    name: "Rahul Sharma",
    avatar: "RS",
    email: "rahul.sharma@student.com",
    referrals: 8,
    earnings: 4200,
    tier: "gold",
    totalValue: 42000,
    isElite: false,
    streakDays: 7,
    level: 12,
    xp: 2350,
    nextLevelXp: 2500,
    achievements: ["First Referral", "Week Warrior", "Money Maker"],
    unlockedDeals: 3,
    lifetimeEarnings: 15600,
    pendingBonus: 1200,
    lastActive: "2 hours ago",
    referralConversionRate: "68%",
    leaderboardPosition: 42,
    weeklyGoal: 5,
    weeklyProgress: 3,
    badges: ["Early Adopter", "Social Butterfly", "Top Performer"],
    notifications: 3,
    nextReward: "Elite Status",
    daysUntilReset: 5,
    engagementScore: 87,
    mood: "happy",
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [userType, setUserType] = useState("student");
  const [referralCode] = useState("AURA-STU-2024");
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showAchievement, setShowAchievement] = useState(null);
  const [viewedReferrals, setViewedReferrals] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [rewardsData, setRewardsData] = useState([]);
  const [activeIncentives, setActiveIncentives] = useState([]);

  // Simulate loading leaderboard data
  useEffect(() => {
    const mockLeaderboard = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: i === 41 ? "You" : `User ${i + 1}`,
      points: Math.floor(Math.random() * 10000),
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      isCurrentUser: i === 41,
    })).sort((a, b) => b.points - a.points);

    setLeaderboardData(mockLeaderboard);
  }, []);

  // Simulate loading rewards data
  useEffect(() => {
    const mockRewards = [
      { id: 1, name: "Amazon Voucher", points: 5000, claimed: false },
      { id: 2, name: "Premium Subscription", points: 7500, claimed: false },
      { id: 3, name: "Exclusive Workshop", points: 10000, claimed: false },
      { id: 4, name: "Mentorship Session", points: 15000, claimed: false },
      { id: 5, name: "VIP Event Access", points: 25000, claimed: false },
    ];
    setRewardsData(mockRewards);
  }, []);

  // Load active incentives
  useEffect(() => {
    const incentives = {
      student: [
        {
          id: 1,
          title: "Exam Season Bonus",
          value: "+₹200 per referral",
          active: true,
          description: "Special bonus during exam season for student referrals",
          expiresIn: "3 days",
          icon: <GraduationCap className="w-5 h-5" />,
          progress: 2,
          goal: 5,
          action: "Refer 3 more friends to unlock",
        },
        {
          id: 2,
          title: "Group Referral",
          value: "₹1000 for 3 friends",
          active: false,
          description: "Get bonus when you refer 3 friends together",
          expiresIn: "7 days",
          icon: <Users className="w-5 h-5" />,
          progress: 1,
          goal: 3,
          action: "Refer 2 more in a group",
        },
      ],
      freelancer: [
        {
          id: 3,
          title: "Freelancer Friday",
          value: "3X rewards",
          active: true,
          description: "Triple points every Friday for freelancers",
          expiresIn: "1 day",
          icon: <Briefcase className="w-5 h-5" />,
          progress: 1,
          goal: 2,
          action: "Complete 1 more referral",
        },
      ],
      organization: [
        {
          id: 4,
          title: "Bulk Discount",
          value: "20% off",
          active: true,
          description: "Discount on bulk purchases for organizations",
          expiresIn: "14 days",
          icon: <Building className="w-5 h-5" />,
          progress: 4,
          goal: 5,
          action: "Refer 1 more team",
        },
      ],
    };
    setActiveIncentives(incentives[userType]);
  }, [userType]);

  // Simulate random achievement unlocks
  useEffect(() => {
    const achievementInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAchievement = {
          title: ["Referral King", "Social Star", "Network Pro"][
            Math.floor(Math.random() * 3)
          ],
          points: Math.floor(Math.random() * 500) + 100,
        };
        setShowAchievement(newAchievement);
        setTimeout(() => setShowAchievement(null), 3000);
      }
    }, 30000);
    return () => clearInterval(achievementInterval);
  }, []);

  // Format time display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  // Copy referral code
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share referral code
  const shareReferral = (platform) => {
    const shareText = `Join me on Aura! Use my referral code ${referralCode} to get started. ${window.location.href}`;

    if (platform === "whatsapp") {
      // For mobile devices
      if (
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        window.open(`whatsapp://send?text=${encodeURIComponent(shareText)}`);
      }
      // For desktop browsers
      else {
        window.open(
          `whatsapp://send?text=${encodeURIComponent(shareText)}`,
          "_blank"
        );
      }
    }
  };

  // View referral details
  const viewReferral = (id) => {
    if (!viewedReferrals.includes(id)) {
      setViewedReferrals([...viewedReferrals, id]);
      // Simulate XP gain for viewing
      setUserData((prev) => ({
        ...prev,
        xp: prev.xp + 10,
        engagementScore: Math.min(prev.engagementScore + 2, 100),
      }));
    }
  };

  // Claim reward
  const claimReward = (id) => {
    setRewardsData(
      rewardsData.map((reward) =>
        reward.id === id ? { ...reward, claimed: true } : reward
      )
    );
    // Simulate points deduction
    setUserData((prev) => ({
      ...prev,
      xp: prev.xp - rewardsData.find((r) => r.id === id).points,
      engagementScore: Math.min(prev.engagementScore + 5, 100),
    }));
  };

  // Complete incentive
  const completeIncentive = (id) => {
    setActiveIncentives(
      activeIncentives.map((incentive) =>
        incentive.id === id
          ? { ...incentive, progress: incentive.goal }
          : incentive
      )
    );
    // Simulate bonus
    setUserData((prev) => ({
      ...prev,
      earnings: prev.earnings + 500,
      xp: prev.xp + 200,
      engagementScore: Math.min(prev.engagementScore + 10, 100),
    }));
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Tier configuration with more details
  const tierConfigs = {
    student: {
      icon: <GraduationCap className="w-5 h-5" />,
      color: "from-blue-500 to-purple-500",
      rewards: [1, 3, 5, 8, 10],
      benefits: [
        "Exclusive student discounts",
        "Early access to new features",
        "Free career counseling sessions",
      ],
    },
    freelancer: {
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-green-500 to-teal-500",
      rewards: [1, 3, 5, 8, 10],
      benefits: [
        "Client matching services",
        "Portfolio showcase",
        "Networking events",
      ],
    },
    organization: {
      icon: <Building className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
      rewards: [1, 3, 5, 8, 10],
      benefits: [
        "Bulk purchase discounts",
        "Dedicated account manager",
        "Custom reporting",
      ],
    },
  };

  // Mock referral history
  const referralHistory = [
    {
      id: 1,
      name: "Priya Patel",
      status: "Signed up",
      value: "₹500",
      date: "2 hours ago",
      new: true,
    },
    {
      id: 2,
      name: "Amit Kumar",
      status: "Completed profile",
      value: "₹300",
      date: "1 day ago",
      new: true,
    },
    {
      id: 3,
      name: "Neha Gupta",
      status: "Made purchase",
      value: "₹1200",
      date: "3 days ago",
      new: false,
    },
    {
      id: 4,
      name: "Rajesh Singh",
      status: "Signed up",
      value: "₹500",
      date: "5 days ago",
      new: false,
    },
    {
      id: 5,
      name: "Sneha Sharma",
      status: "Completed profile",
      value: "₹300",
      date: "1 week ago",
      new: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Achievement Popup */}
      {showAchievement && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl shadow-xl text-white text-center animate-bounce">
            <div className="flex justify-center mb-4">
              <Trophy className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Achievement Unlocked!</h3>
            <p className="text-xl mb-1">{showAchievement.title}</p>
            <p className="text-lg">+{showAchievement.points} XP</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              A
            </div>
            <h1 className="text-xl font-bold">Aura Referral Program</h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell className="w-5 h-5" />
                {userData.notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {userData.notifications}
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="text-sm text-gray-500">Level {userData.level}</p>
                <div className="w-24 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full"
                    style={{
                      width: `${(userData.xp / userData.nextLevelXp) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
                <div
                  className={`w-2 h-2 rounded-full ${
                    userData.tier === "gold" ? "bg-yellow-500" : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-sm font-medium capitalize">
                  {userData.tier} Tier
                </span>
              </div>

              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                {userData.avatar}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Welcome back, {userData.name.split(" ")[0]}!
                {userData.mood === "happy" ? (
                  <Smile className="inline ml-2 w-6 h-6" />
                ) : userData.mood === "sad" ? (
                  <Frown className="inline ml-2 w-6 h-6" />
                ) : (
                  <Meh className="inline ml-2 w-6 h-6" />
                )}
              </h2>
              <p className="text-blue-100">
                {userData.referrals > 7
                  ? "You're crushing it! Only 2 referrals to Elite status!"
                  : userData.referrals > 3
                  ? "Great progress! Keep going to unlock Elite benefits!"
                  : "Get started with your first referral today!"}
              </p>

              <div className="mt-4 flex items-center space-x-4">
                <div className="bg-white/20 px-3 py-1 rounded-full flex items-center">
                  <Flame className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">
                    Streak: {userData.streakDays} days
                  </span>
                </div>

                <div className="bg-white/20 px-3 py-1 rounded-full flex items-center">
                  <Activity className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">
                    Engagement: {userData.engagementScore}/100
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <div className="text-center">
                  <p className="text-xs text-blue-100">Weekly Goal</p>
                  <p className="font-bold">
                    {userData.weeklyProgress}/{userData.weeklyGoal}
                  </p>
                </div>
                <div className="w-12 h-12 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="3"
                      strokeDasharray={`${
                        (userData.weeklyProgress / userData.weeklyGoal) * 100
                      }, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
                    {Math.round(
                      (userData.weeklyProgress / userData.weeklyGoal) * 100
                    )}
                    %
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 bg-white rounded-xl shadow-sm p-2 mb-6 overflow-x-auto">
          {[
            {
              id: "dashboard",
              icon: <PieChart className="w-4 h-4 mr-2" />,
              label: "Dashboard",
            },
            {
              id: "rewards",
              icon: <Award className="w-4 h-4 mr-2" />,
              label: "Rewards",
            },
            {
              id: "incentives",
              icon: <Zap className="w-4 h-4 mr-2" />,
              label: "Incentives",
            },
            {
              id: "leaderboard",
              icon: <BarChart2 className="w-4 h-4 mr-2" />,
              label: "Leaderboard",
            },
            {
              id: "history",
              icon: <Clock className="w-4 h-4 mr-2" />,
              label: "History",
            },
            {
              id: "benefits",
              icon: <Shield className="w-4 h-4 mr-2" />,
              label: "Benefits",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Time-Sensitive Offer */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl shadow-sm p-5 mb-6 text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -right-5 -bottom-5 w-20 h-20 bg-white/10 rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-xl mb-1 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Flash Bonus Active!
              </h3>
              <p className="text-orange-100">
                Double rewards for all referrals completed in the next hour
              </p>
            </div>

            <div className="bg-white/20 px-4 py-2 rounded-full flex items-center">
              <Timer className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {formatTime(timeLeft)} remaining
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Referral Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-500" />
                    Your Referral Network
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-gray-500">Active</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-lg relative">
                      {referralCode}
                      {copied && (
                        <div className="absolute -top-8 -right-2 bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Copied!
                        </div>
                      )}
                    </div>
                    <button
                      onClick={copyReferralCode}
                      className={`px-4 py-4 rounded-lg transition-all ${
                        copied
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button
                      onClick={() => shareReferral("whatsapp")}
                      className="bg-green-50 text-green-600 hover:bg-green-100 py-2 px-3 rounded-lg transition-all flex items-center justify-center text-sm"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => shareReferral("email")}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-3 rounded-lg transition-all flex items-center justify-center text-sm"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </button>
                    <button
                      onClick={() => shareReferral("Instagram")}
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 px-3 rounded-lg transition-all flex items-center justify-center text-sm"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </button>

                    <button
                      onClick={() => setShowShareOptions(!showShareOptions)}
                      className="bg-purple-50 text-purple-600 hover:bg-purple-100 py-2 px-3 rounded-lg transition-all flex items-center justify-center text-sm"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      More
                    </button>
                  </div>

                  {showShareOptions && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-2 gap-2">
                      <button className="flex items-center justify-center p-2 rounded hover:bg-gray-100 text-sm">
                        <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                        Facebook
                      </button>

                      <button className="flex items-center justify-center p-2 rounded hover:bg-gray-100 text-sm">
                        <Copy className="w-4 h-4 mr-2 text-gray-600" />
                        Copy Link
                      </button>
                    </div>
                  )}
                </div>

                {/* Recent Referrals */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                    Recent Activity
                  </h4>

                  <div className="space-y-3">
                    {referralHistory.map((referral) => (
                      <div
                        key={referral.id}
                        onClick={() => viewReferral(referral.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          referral.new
                            ? "border-purple-200 bg-purple-50"
                            : "border-gray-200 bg-gray-50"
                        } ${
                          viewedReferrals.includes(referral.id)
                            ? "opacity-75"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{referral.name}</h4>
                            <p className="text-sm text-gray-500">
                              {referral.status}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">
                              {referral.value}
                            </p>
                            <p className="text-xs text-gray-400">
                              {referral.date}
                            </p>
                          </div>
                        </div>
                        {referral.new &&
                          !viewedReferrals.includes(referral.id) && (
                            <div className="mt-2 text-xs text-purple-600 flex items-center">
                              <span className="w-2 h-2 rounded-full bg-purple-500 mr-1 animate-pulse"></span>
                              New activity
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-500" />
                  Your Progress Path
                </h3>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      Next milestone: {userData.nextReward}
                    </span>
                    <span className="text-sm font-medium">
                      {userData.referrals}/10 referrals
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                      style={{ width: `${(userData.referrals / 10) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between relative">
                    <div className="absolute top-0 left-0 right-0 h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full opacity-20"></div>
                    </div>

                    {tierConfigs[userType].rewards.map((threshold, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center relative z-10"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 border-2 ${
                            userData.referrals >= threshold
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-white"
                              : "bg-white text-gray-400 border-gray-200"
                          }`}
                        >
                          {threshold}
                        </div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            userData.referrals >= threshold
                              ? "bg-blue-500"
                              : "bg-gray-200"
                          }`}
                        ></div>

                        {index === tierConfigs[userType].rewards.length - 1 && (
                          <div className="absolute top-0 right-0 transform translate-x-1/2">
                            <div className="bg-yellow-400 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold">
                              ELITE
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tier Benefits */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-500" />
                    {userData.tier.charAt(0).toUpperCase() +
                      userData.tier.slice(1)}{" "}
                    Tier Benefits
                  </h4>

                  <ul className="space-y-2">
                    {tierConfigs[userType].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                  Performance Dashboard
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Total Referrals</span>
                    </div>
                    <span className="font-semibold">{userData.referrals}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">This Month</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      ₹{userData.earnings.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Lifetime Earnings</span>
                    </div>
                    <span className="font-semibold">
                      ₹{userData.lifetimeEarnings.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <BarChart2 className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Conversion Rate</span>
                    </div>
                    <span className="font-semibold">
                      {userData.referralConversionRate}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Leaderboard Rank</span>
                    </div>
                    <span className="font-semibold">
                      #{userData.leaderboardPosition}
                    </span>
                  </div>
                </div>
              </div>

              {/* Incentives Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Active Challenges
                </h3>

                <div className="space-y-3">
                  {activeIncentives.map((incentive, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        incentive.active
                          ? "border-purple-200 bg-purple-50 hover:bg-purple-100"
                          : "border-gray-200 bg-gray-50 opacity-70"
                      }`}
                      onClick={() =>
                        incentive.progress === incentive.goal &&
                        completeIncentive(incentive.id)
                      }
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-2">
                          <div
                            className={`p-1 rounded-md ${
                              incentive.active
                                ? "bg-purple-100 text-purple-600"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {incentive.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{incentive.title}</h4>
                            <p className="text-sm text-gray-500">
                              {incentive.value}
                            </p>
                            <p className="text-xs text-purple-600 mt-1">
                              {incentive.action}
                            </p>
                          </div>
                        </div>
                        {incentive.progress === incentive.goal ? (
                          <button className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                            Claim
                          </button>
                        ) : (
                          <div className="text-xs bg-white px-2 py-1 rounded-full border">
                            {incentive.progress}/{incentive.goal}
                          </div>
                        )}
                      </div>

                      {incentive.active &&
                        incentive.progress < incentive.goal && (
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full"
                              style={{
                                width: `${
                                  (incentive.progress / incentive.goal) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-500" />
                  Your Badges
                </h3>

                <div className="flex flex-wrap gap-3">
                  {userData.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 px-3 py-1 rounded-full flex items-center"
                    >
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-blue-800">{badge}</span>
                    </div>
                  ))}
                  {userData.badges.length < 3 && (
                    <div className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full flex items-center">
                      <span className="text-sm text-gray-500">
                        {3 - userData.badges.length} more to unlock
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Rewards Tab */}
        {activeTab === "rewards" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Redeem Your Rewards
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewardsData.map((reward) => (
                <div
                  key={reward.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-3 flex justify-center">
                    <Gift className="w-10 h-10 text-purple-500" />
                  </div>
                  <h4 className="font-medium text-lg mb-1">{reward.name}</h4>
                  <p className="text-gray-500 text-sm mb-3">
                    {reward.points.toLocaleString()} points
                  </p>
                  <button
                    onClick={() => claimReward(reward.id)}
                    disabled={userData.xp < reward.points || reward.claimed}
                    className={`w-full py-2 rounded-lg font-medium text-sm ${
                      reward.claimed
                        ? "bg-green-100 text-green-800"
                        : userData.xp >= reward.points
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {reward.claimed ? "Claimed" : "Redeem Now"}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                How to earn more points
              </h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start">
                  <Zap className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0" />
                  Complete your profile (+100 pts)
                </li>
                <li className="flex items-start">
                  <Users className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                  Refer a friend (+500 pts per successful referral)
                </li>
                <li className="flex items-start">
                  <Flame className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" />
                  Maintain a 7-day streak (+200 pts)
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-blue-500" />
              Community Leaderboard
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Rank</th>
                    <th className="pb-3">User</th>
                    <th className="pb-3 text-right">Points</th>
                    <th className="pb-3 text-right">Referrals</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.slice(0, 10).map((user, index) => (
                    <tr
                      key={user.id}
                      className={`border-b ${
                        user.isCurrentUser ? "bg-blue-50 font-medium" : ""
                      }`}
                    >
                      <td className="py-3">
                        {index === 0 ? (
                          <Crown className="w-5 h-5 text-yellow-500" />
                        ) : index === 1 ? (
                          <Trophy className="w-5 h-5 text-gray-400" />
                        ) : index === 2 ? (
                          <Award className="w-5 h-5 text-orange-400" />
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <span>{user.name}</span>
                          {user.isCurrentUser && (
                            <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 text-right">
                        {user.points.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        {Math.floor(user.points / 500)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userData.leaderboardPosition > 10 && (
              <div className="mt-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="w-8 text-center">
                      {userData.leaderboardPosition}
                    </span>
                    <img
                      src={`https://i.pravatar.cc/150?img=${userData.leaderboardPosition}`}
                      alt="You"
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span>You</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">
                      {Math.floor(
                        leaderboardData[userData.leaderboardPosition - 1]
                          .points / 500
                      )}{" "}
                      referrals
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <button className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center justify-center mx-auto">
                View full leaderboard <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Incentives Tab */}
        {activeTab === "incentives" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-500" />
              Special Incentives
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeIncentives.map((incentive) => (
                <div
                  key={incentive.id}
                  className={`border rounded-lg p-5 transition-all ${
                    incentive.active
                      ? "border-purple-200 bg-purple-50 hover:shadow-md"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start mb-3">
                    <div
                      className={`p-2 rounded-md mr-3 ${
                        incentive.active
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {incentive.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">{incentive.title}</h4>
                      <p className="text-purple-600 font-medium">
                        {incentive.value}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {incentive.description}
                  </p>

                  <div className="flex justify-between items-center text-sm mb-3">
                    <span className="text-gray-500">
                      Expires in: {incentive.expiresIn}
                    </span>
                    <span className="font-medium">
                      {incentive.progress}/{incentive.goal} completed
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className={`h-2 rounded-full ${
                        incentive.active
                          ? "bg-gradient-to-r from-blue-500 to-purple-500"
                          : "bg-gray-400"
                      }`}
                      style={{
                        width: `${
                          (incentive.progress / incentive.goal) * 100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <button
                    onClick={() =>
                      incentive.progress === incentive.goal &&
                      completeIncentive(incentive.id)
                    }
                    disabled={
                      incentive.progress < incentive.goal || !incentive.active
                    }
                    className={`w-full py-2 rounded-lg text-sm font-medium ${
                      incentive.progress === incentive.goal && incentive.active
                        ? "bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {incentive.progress === incentive.goal
                      ? "Claim Reward"
                      : incentive.active
                      ? "Complete Challenge"
                      : "Coming Soon"}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-100">
              <h4 className="font-medium text-lg mb-2 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                How to maximize your earnings
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-100 text-blue-600 p-1 rounded-md mr-3">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-medium">Group Referrals</h5>
                    <p className="text-gray-600 text-sm">
                      Get 3 friends to sign up together for a 25% bonus
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-100 text-purple-600 p-1 rounded-md mr-3">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-medium">Maintain Streaks</h5>
                    <p className="text-gray-600 text-sm">
                      7-day streak unlocks double points for referrals
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-yellow-100 text-yellow-600 p-1 rounded-md mr-3">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-medium">Time Bonuses</h5>
                    <p className="text-gray-600 text-sm">
                      Referrals during peak hours (6-9 PM) earn 15% more
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Your Referral History
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Referral</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {referralHistory.map((referral) => (
                    <tr key={referral.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 text-sm text-gray-500">
                        {referral.date}
                      </td>
                      <td className="py-3 font-medium">{referral.name}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            referral.status === "Made purchase"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {referral.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-medium text-green-600">
                        {referral.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-500">Showing last 5 referrals</p>
              <button className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center">
                View full history <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Benefits Tab */}
        {activeTab === "benefits" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-500" />
              Your Tier Benefits
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="border rounded-lg p-5 hover:shadow-md transition-all">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4 flex justify-center">
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
                <h4 className="font-medium text-lg mb-2">
                  Current Tier:{" "}
                  {userData.tier.charAt(0).toUpperCase() +
                    userData.tier.slice(1)}
                </h4>
                <p className="text-gray-600 mb-4">
                  You're enjoying these exclusive benefits based on your
                  activity level
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${(userData.referrals / 10) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="border rounded-lg p-5 hover:shadow-md transition-all">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4 flex justify-center">
                  <Rocket className="w-8 h-8 text-purple-500" />
                </div>
                <h4 className="font-medium text-lg mb-2">Next Tier: Elite</h4>
                <p className="text-gray-600 mb-4">
                  Unlock these premium benefits when you reach Elite status
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Exclusive event invitations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Higher commission rates</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-5 hover:shadow-md transition-all">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-4 flex justify-center">
                  <TrendingUp className="w-8 h-8 text-blue-500" />
                </div>
                <h4 className="font-medium text-lg mb-2">Tier Comparison</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Benefit</th>
                        <th className="text-center pb-2">Current</th>
                        <th className="text-center pb-2">Elite</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Commission Rate</td>
                        <td className="py-2 text-center">10%</td>
                        <td className="py-2 text-center font-medium">15%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Support Priority</td>
                        <td className="py-2 text-center">Standard</td>
                        <td className="py-2 text-center font-medium">High</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Bonus Multipliers</td>
                        <td className="py-2 text-center">1.2x</td>
                        <td className="py-2 text-center font-medium">1.5x</td>
                      </tr>
                      <tr>
                        <td className="py-2">Exclusive Deals</td>
                        <td className="py-2 text-center">3/month</td>
                        <td className="py-2 text-center font-medium">
                          Unlimited
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-100">
              <h4 className="font-medium text-lg mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-500" />
                Your Path to Elite Status
              </h4>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">
                    {10 - userData.referrals} more referrals needed
                  </span>
                  <span className="text-sm font-medium">
                    {userData.referrals}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                    style={{ width: `${(userData.referrals / 10) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <h5 className="font-medium mb-1 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                    Quick Wins
                  </h5>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Refer 3 friends this week (+200 bonus points)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Complete your profile (+100 points)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <h5 className="font-medium mb-1 flex items-center">
                    <Bolt className="w-4 h-4 mr-2 text-blue-500" />
                    Boost Your Progress
                  </h5>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Share on social media (2x points today)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Refer during happy hours (6-9 PM)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-10 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-medium">Aura Referral Program</span>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Help Center
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Contact
              </a>
            </div>
          </div>

          <div className="mt-6 text-center md:text-left text-xs text-gray-400">
            © {new Date().getFullYear()} Aura Inc. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuraReferralProgram;
