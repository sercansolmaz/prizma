# 🎯 Prizma - Türkçe Bilgi Yarışması

Modern ve etkileşimli Türkçe bilgi yarışması oyunu. React ve Tailwind CSS ile geliştirilmiştir.

## 🌟 Özellikler

### ⚡ Zaman Limiti Sistemi
- Zorluk seviyesine göre farklı süreler (Kolay: 30s, Orta: 20s, Zor: 15s)
- Görsel countdown timer
- Kritik zaman uyarıları
- Süre dolunca otomatik yanlış

### 🎯 Local Storage Tercihleri
- Ses açık/kapalı durumu
- Son seçilen kategori/zorluk
- Soru sayısı tercihi
- Timer açık/kapalı durumu
- Yüksek skor tablosu (en iyi 10)

### 🏆 Başarı Sistemi
- 8 farklı başarı rozeti
- Popup başarı bildirimleri
- İlerleme takibi
- Achievement unlock animasyonları

### 📈 İstatistik Paneli
- Toplam oynanan oyun
- Mükemmel skor sayısı
- Kazanılan başarı sayısı
- En iyi seri (combo)
- Detaylı yüksek skor tablosu

### 🌙 Tema Sistemi
- 4 farklı tema: Varsayılan, Gece Modu, Renk Körleri, Okyanus
- Yüksek kontrast modu
- Erişilebilirlik desteği
- Tema tercihi kaydedilir

### 🏆 Global Leaderboard
- IP tabanlı skor sistemi
- Her IP'den sadece en yüksek skor
- Global rekabet
- Nickname ile kişiselleştirme
- Gerçek zamanlı skor tablosu

### 🎵 Ses Efektleri
- Doğru/yanlış cevap sesleri
- Tıklama sesleri
- iOS Safari uyumlu
- Açık/kapalı toggle

### 📱 Mobil Uyumlu
- Responsive tasarım
- Touch-friendly arayüz
- Mobil optimizasyonları

## 📚 Soru Kategorileri

- 🏛️ Türkiye Tarihi
- 🌍 Dünya Tarihi
- 🎭 Türk Edebiyatı
- 📖 Dünya Edebiyatı
- 🧬 Bilim
- 🎨 Sanat
- ⚽ Spor
- 🗺️ Coğrafya
- 🍽️ Yemek Kültürü
- 🐾 Hayvanlar
- 🚀 Uzay
- 📝 Türk Dili
- 🔢 Matematik
- 🧪 Fen Bilgisi
- 🎶 Türk Musikisi

Her kategori için 3 zorluk seviyesi (Kolay, Orta, Zor) mevcuttur.

## 🚀 Nasıl Çalıştırılır

### Basit HTTP Server
```bash
python3 -m http.server 8080
```

Ardından tarayıcınızda `http://localhost:8080` adresine gidin.

### Live Server (VS Code)
1. Live Server eklentisini yükleyin
2. `index.html` dosyasını açın
3. "Go Live" butonuna tıklayın

## 🛠️ Teknolojiler

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Babel** - JSX transpilation
- **Web Audio API** - Ses efektleri
- **Local Storage** - Veri saklama

## 🎮 Oyun Nasıl Oynanır

1. **Kategori Seçimi**: İstediğiniz kategorileri seçin
2. **Zorluk**: Kolay, Orta veya Zor zorluk seviyesini belirleyin
3. **Soru Sayısı**: 5, 10, 15 veya 20 soru arasından seçin
4. **Timer**: İsteğe bağlı olarak zaman limitini açabilirsiniz
5. **Tema**: Gözünüze hoş gelen temayı seçin
6. **Oyna**: Sorulara cevap verin ve puanınızı görün!

## 🏆 Başarılar

- 🎯 **İlk Adım**: İlk oyununu tamamla
- 💯 **Mükemmel!**: Tüm soruları doğru cevapla
- ⚡ **Hız Canavarı**: 10 saniyede soru cevapla
- 🔥 **Seri Ustası**: Üst üste 10 doğru cevap
- 🎓 **Kategori Uzmanı**: Bir kategoride %90+ al
- 🏆 **Veteran**: 50 oyun tamamla
- 📚 **Bilgi Avcısı**: Tüm kategorileri dene
- ⏰ **Zaman Ustası**: Timer açıkken 10 oyun kazan

## 📞 İletişim

Geliştirici: [@sercansolmaz](https://x.com/sercansolmaz)

## 📄 Lisans

Bu proje açık kaynak kodludur ve MIT lisansı altında sunulmaktadır.