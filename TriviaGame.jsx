import React, { useState } from 'react';

const TRANSLATIONS = {
  "tr-TR": {
    "triviaTitle": "PRİZMA",
    "triviaSubtitle": "Bilginizi Test Edin",
    "rulesTitle": "📋 Kurallar ve Bilgiler",
    "rulesContent": {
      "howToPlay": "🎮 Nasıl Oynanır?",
      "howToPlayDesc": "İstediğiniz kategorileri seçin, zorluk seviyenizi belirleyin ve soru sayısını ayarlayın. Her soruya 4 seçenekten birini seçerek cevap verin.",
      "questionBank": "🎯 Soru Bankası",
      "questionBankDesc": "Sonsuz soru çeşitliliği! Her oyunda Claude AI tarafından gerçek zamanlı olarak yeni sorular üretilir. Aynı soruyu iki kez görmezsiniz.",
      "scoring": "⭐ Puanlama",
      "scoringDesc": "Her doğru cevap 1 puan değerindedir. Oyun sonunda başarı yüzdenizi ve detaylı analizinizi görebilirsiniz.",
      "categories": "🎨 Kategoriler",
      "categoriesDesc": "16 farklı kategori: Türkiye Tarihi, Dünya Tarihi, Coğrafya, Spor, Sinema, Müzik, Edebiyat, Sanat, Teknoloji, Yemek Kültürü, Hayvanlar, Uzay, Türk Dili, Matematik, Fen Bilgisi, Türk Musikisi",
      "difficulty": "⚡ Zorluk Seviyeleri",
      "difficultyDesc": "Kolay: Temel bilgiler, Orta: Genel kültür, Zor: Uzman seviyesi sorular"
    },
    "categoriesTitle": "Kategoriler",
    "difficultyTitle": "Zorluk Seviyesi",
    "numQuestionsTitle": "Soru Sayısı",
    "startGameButton": "Oyunu Başlat",
    "generatingQuestionsTitle": "Sorular hazırlanıyor...",
    "generatingQuestionsSubtitle": "Bilgi yarışmanız için sorular oluşturuluyor",
    "questionOf": "Soru",
    "of": "/",
    "score": "Puan:",
    "checkAnswerButton": "Cevabı Kontrol Et",
    "nextQuestionButton": "Sonraki Soru",
    "finishGameButton": "Oyunu Bitir",
    "resultsTitle": "Sonuçlar",
    "correct": "Doğru",
    "excellentMessage": "🏆 Mükemmel!",
    "goodJobMessage": "👍 Harika iş!",
    "notBadMessage": "👌 Fena değil!",
    "keepStudyingMessage": "📚 Daha çok çalış!",
    "yourAnswer": "Cevabınız:",
    "correctAnswer": "Doğru cevap:",
    "playAgainButton": "Tekrar Oyna",
    "selectCategoryAlert": "Lütfen en az bir kategori seçin!",
    "selectAnswerAlert": "Lütfen bir cevap seçin!",
    "generateQuestionsError": "Sorular oluşturulamadı. Lütfen tekrar deneyin.",
    "easy": "Kolay",
    "medium": "Orta",
    "hard": "Zor"
  }
};

const appLocale = 'tr-TR';
const locale = 'tr-TR';
const t = (key) => TRANSLATIONS[locale]?.[key] || key;

const TriviaGame = () => {
  const [gameState, setGameState] = useState('setup');
  const [categories, setCategories] = useState([]);
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const availableCategories = [
    { name: 'Türkiye Tarihi', emoji: '🏛️', color: 'from-amber-400 to-orange-500' },
    { name: 'Dünya Tarihi', emoji: '🌍', color: 'from-blue-400 to-indigo-500' },
    { name: 'Coğrafya', emoji: '🗺️', color: 'from-emerald-400 to-teal-500' },
    { name: 'Spor', emoji: '⚽', color: 'from-green-400 to-lime-500' },
    { name: 'Sinema', emoji: '🎬', color: 'from-purple-400 to-pink-500' },
    { name: 'Müzik', emoji: '🎵', color: 'from-rose-400 to-red-500' },
    { name: 'Edebiyat', emoji: '📚', color: 'from-indigo-400 to-purple-500' },
    { name: 'Sanat', emoji: '🎨', color: 'from-pink-400 to-rose-500' },
    { name: 'Teknoloji', emoji: '💻', color: 'from-cyan-400 to-blue-500' },
    { name: 'Yemek Kültürü', emoji: '🍽️', color: 'from-orange-400 to-red-500' },
    { name: 'Hayvanlar', emoji: '🦁', color: 'from-yellow-400 to-orange-500' },
    { name: 'Uzay', emoji: '🚀', color: 'from-violet-400 to-purple-500' },
    { name: 'Türk Dili', emoji: '📖', color: 'from-red-400 to-pink-500' },
    { name: 'Matematik', emoji: '🔢', color: 'from-teal-400 to-cyan-500' },
    { name: 'Fen Bilgisi', emoji: '🧪', color: 'from-lime-400 to-green-500' },
    { name: 'Türk Musikisi', emoji: '🎶', color: 'from-amber-400 to-yellow-500' }
  ];

  const toggleCategory = (categoryName) => {
    setCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const generateQuestions = async () => {
    if (categories.length === 0) {
      alert(t('selectCategoryAlert'));
      return;
    }

    setGameState('loading');
    
    // Mock question generation for demo purposes
    // In a real application, you would call an AI API
    setTimeout(() => {
      const mockQuestions = [
        {
          question: "Türkiye'nin başkenti neresidir?",
          options: ["İstanbul", "Ankara", "İzmir", "Bursa"],
          correctAnswer: 1,
          category: categories[0] || "Coğrafya"
        },
        {
          question: "Hangi element altın için kullanılan sembol?",
          options: ["Au", "Ag", "Go", "Gd"],
          correctAnswer: 0,
          category: categories[0] || "Fen Bilgisi"
        },
        {
          question: "Hangi yıl Türkiye Cumhuriyeti kuruldu?",
          options: ["1920", "1921", "1922", "1923"],
          correctAnswer: 3,
          category: categories[0] || "Türkiye Tarihi"
        },
        {
          question: "En büyük okyanus hangisidir?",
          options: ["Atlantik", "Pasifik", "Hint", "Arktik"],
          correctAnswer: 1,
          category: categories[0] || "Coğrafya"
        },
        {
          question: "Hangi planet güneşe en yakındır?",
          options: ["Venüs", "Mars", "Merkür", "Dünya"],
          correctAnswer: 2,
          category: categories[0] || "Uzay"
        }
      ];

      // Rastgele sorular seç
      const shuffled = mockQuestions.sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffled.slice(0, numQuestions);
      setQuestions(selectedQuestions);
      setGameState('playing');
      setCurrentQuestion(0);
      setScore(0);
      setAnswers([]);
    }, 2000);
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) {
      alert(t('selectAnswerAlert'));
      return;
    }

    if (!showAnswer) {
      setShowAnswer(true);
      return;
    }

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, {
      questionIndex: currentQuestion,
      selectedAnswer,
      isCorrect
    }];
    
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setGameState('results');
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswers([]);
    setQuestions([]);
    setShowAnswer(false);
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mt-8 mb-12">
            <div className="relative">
              <h1 className="text-8xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                ✨ {t('triviaTitle')} ✨
              </h1>
              <div className="absolute -top-4 -right-4 text-6xl animate-bounce">🎯</div>
              <div className="absolute -top-2 -left-6 text-4xl animate-spin">🌟</div>
            </div>
            <p className="text-2xl text-cyan-200 font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('triviaSubtitle')}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-6 text-yellow-300 flex items-center gap-3">
                🎨 {t('categoriesTitle')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableCategories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => toggleCategory(category.name)}
                    className={`group relative p-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 border-2 ${
                      categories.includes(category.name)
                        ? `bg-gradient-to-r ${category.color} text-white border-white shadow-2xl scale-105`
                        : 'bg-white/5 text-white border-white/30 hover:border-white/60 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-3xl mb-2">{category.emoji}</div>
                    <div className="text-sm">{category.name}</div>
                    {categories.includes(category.name) && (
                      <div className="absolute -top-2 -right-2 bg-green-400 text-green-900 rounded-full w-8 h-8 flex items-center justify-center text-xl font-black">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-pink-300 flex items-center gap-3">
                  ⚡ {t('difficultyTitle')}
                </h2>
                <div className="flex gap-4">
                  {[
                    { key: 'easy', color: 'from-green-400 to-emerald-500', emoji: '😊' },
                    { key: 'medium', color: 'from-yellow-400 to-orange-500', emoji: '🤔' },
                    { key: 'hard', color: 'from-red-400 to-pink-500', emoji: '😤' }
                  ].map(diff => (
                    <button
                      key={diff.key}
                      onClick={() => setDifficulty(diff.key)}
                      className={`flex-1 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 border-2 ${
                        difficulty === diff.key
                          ? `bg-gradient-to-r ${diff.color} text-white border-white shadow-2xl scale-105`
                          : 'bg-white/5 text-white border-white/30 hover:border-white/60 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-2xl mb-1">{diff.emoji}</div>
                      <div>{t(diff.key)}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-cyan-300 flex items-center gap-3">
                  📊 {t('numQuestionsTitle')}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[5, 10, 15, 20].map(num => (
                    <button
                      key={num}
                      onClick={() => setNumQuestions(num)}
                      className={`px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 border-2 ${
                        numQuestions === num
                          ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white border-white shadow-2xl scale-105'
                          : 'bg-white/5 text-white border-white/30 hover:border-white/60 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-2xl mb-1">🎲</div>
                      <div>{num}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={generateQuestions}
              className="w-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 hover:from-green-500 hover:via-blue-500 hover:to-purple-600 text-white font-black py-6 px-8 rounded-2xl text-2xl transition-all duration-300 shadow-2xl transform hover:scale-105 mb-8"
            >
              <span className="flex items-center justify-center gap-3">
                🚀 {t('startGameButton')} 🚀
              </span>
            </button>
            
            <div className="text-center text-lg text-white/80 border-t border-white/20 pt-6">
              <div className="flex items-center justify-center gap-2">
                By{' '}
                <a 
                  href="https://x.com/sercansolmaz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 font-bold transition-colors duration-200 flex items-center gap-2 hover:scale-110 transform"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  SercanSolmaz
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin w-24 h-24 border-8 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
            <div className="absolute inset-0 animate-ping w-24 h-24 border-4 border-pink-400 border-t-transparent rounded-full mx-auto"></div>
          </div>
          <h2 className="text-4xl font-bold text-red-400 mb-4 animate-pulse">
            ⚡ {t('generatingQuestionsTitle')} ⚡
          </h2>
          <p className="text-xl text-cyan-200">{t('generatingQuestionsSubtitle')}</p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const question = questions[currentQuestion];
    const categoryInfo = availableCategories.find(cat => cat.name === question.category) || 
                        { emoji: '❓', color: 'from-gray-400 to-gray-500' };
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20">
              <div className="text-cyan-300 font-bold text-xl flex items-center gap-2">
                🎯 {t('questionOf')} {currentQuestion + 1} {t('of')} {questions.length}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 border border-white/20">
              <div className="text-yellow-300 font-bold text-xl flex items-center gap-2">
                ⭐ {t('score')} {score}
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="mb-8">
              <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${categoryInfo.color} rounded-2xl text-white font-bold text-lg mb-6 shadow-lg`}>
                <span className="text-2xl">{categoryInfo.emoji}</span>
                {question.category}
              </div>
              <h2 className="text-3xl font-bold leading-relaxed text-white">
                {question.question}
              </h2>
            </div>

            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => {
                let buttonClass = 'w-full p-6 rounded-2xl font-bold text-left transition-all duration-300 transform hover:scale-102 border-2 ';
                let showCheckmark = false;
                
                if (showAnswer) {
                  if (index === question.correctAnswer) {
                    buttonClass += 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-300 shadow-2xl scale-102';
                    showCheckmark = true;
                  } else if (index === selectedAnswer && index !== question.correctAnswer) {
                    buttonClass += 'bg-gradient-to-r from-red-400 to-pink-500 text-white border-red-300 shadow-xl';
                  } else {
                    buttonClass += 'bg-white/5 text-white/50 border-white/20';
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += 'bg-gradient-to-r from-purple-400 to-pink-500 text-white border-purple-300 shadow-2xl scale-102';
                  } else {
                    buttonClass += 'bg-white/5 text-white border-white/30 hover:border-white/60 hover:bg-white/10 hover:shadow-xl';
                  }
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => !showAnswer && selectAnswer(index)}
                    disabled={showAnswer}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-black bg-white/20 rounded-full w-10 h-10 flex items-center justify-center">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-lg">{option}</span>
                      </div>
                      <div className="text-white text-3xl w-8 h-8 flex items-center justify-center">
                        {showCheckmark && index === question.correctAnswer && '✅'}
                        {showAnswer && index === selectedAnswer && index !== question.correctAnswer && '❌'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 hover:from-orange-500 hover:via-pink-500 hover:to-purple-600 text-white font-black py-6 px-8 rounded-2xl text-2xl transition-all duration-300 shadow-2xl transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-3">
                {!showAnswer 
                  ? `🔍 ${t('checkAnswerButton')}`
                  : currentQuestion + 1 === questions.length 
                  ? `🏁 ${t('finishGameButton')}`
                  : `➡️ ${t('nextQuestionButton')}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-7xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              🏆 {t('resultsTitle')} 🏆
            </h1>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
            <div className="text-8xl font-black mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              {score}/{questions.length}
            </div>
            <div className="text-4xl font-bold mb-8 text-yellow-300">
              {percentage}% {t('correct')}
            </div>
            
            <div className="text-3xl mb-12 p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
              {percentage >= 80 ? t('excellentMessage') : 
               percentage >= 60 ? t('goodJobMessage') : 
               percentage >= 40 ? t('notBadMessage') : t('keepStudyingMessage')}
            </div>

            <div className="space-y-4 mb-8 text-left max-h-96 overflow-y-auto">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer && userAnswer.isCorrect;
                const categoryInfo = availableCategories.find(cat => cat.name === question.category) || 
                                   { emoji: '❓', color: 'from-gray-400 to-gray-500' };
                
                return (
                  <div key={index} className={`p-6 rounded-2xl border-2 ${
                    isCorrect 
                      ? 'border-green-400 bg-gradient-to-r from-green-900/30 to-emerald-900/30' 
                      : 'border-red-400 bg-gradient-to-r from-red-900/30 to-pink-900/30'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{categoryInfo.emoji}</span>
                      <span className="font-bold text-lg">{question.question}</span>
                    </div>
                    <div className="text-lg">
                      <div className={`mb-2 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                        {isCorrect ? '✅' : '❌'} {t('yourAnswer')} {question.options[userAnswer.selectedAnswer]}
                      </div>
                      {!isCorrect && (
                        <div className="text-green-300">
                          ✅ {t('correctAnswer')} {question.options[question.correctAnswer]}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-600 text-white font-black py-6 px-8 rounded-2xl text-2xl transition-all duration-300 shadow-2xl transform hover:scale-105 mb-8"
            >
              <span className="flex items-center justify-center gap-3">
                🔄 {t('playAgainButton')} 🔄
              </span>
            </button>
            
            <div className="text-center text-lg text-white/80 border-t border-white/20 pt-6">
              <div className="flex items-center justify-center gap-2">
                By{' '}
                <a 
                  href="https://x.com/sercansolmaz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 font-bold transition-colors duration-200 flex items-center gap-2 hover:scale-110 transform"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  SercanSolmaz
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TriviaGame;