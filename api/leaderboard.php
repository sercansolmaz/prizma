<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// OPTIONS request için
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Basit dosya tabanlı veritabanı
$dataFile = 'scores.json';

// Dosya yoksa oluştur
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([]));
}

// IP adresini al
function getUserIP() {
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (!empty($_SERVER['HTTP_X_REAL_IP'])) {
        return $_SERVER['HTTP_X_REAL_IP'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

// Verileri oku
function readScores() {
    global $dataFile;
    $data = file_get_contents($dataFile);
    return json_decode($data, true) ?: [];
}

// Verileri yaz
function writeScores($scores) {
    global $dataFile;
    file_put_contents($dataFile, json_encode($scores, JSON_PRETTY_PRINT));
}

// Skor gönderme
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['score']) || !isset($input['nickname'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Geçersiz veri']);
        exit;
    }
    
    $userIP = getUserIP();
    $score = (int)$input['score'];
    $totalQuestions = (int)($input['totalQuestions'] ?? 10);
    $percentage = round(($score / $totalQuestions) * 100);
    $nickname = substr(trim($input['nickname']), 0, 20); // Max 20 karakter
    $difficulty = $input['difficulty'] ?? 'medium';
    $categories = $input['categories'] ?? [];
    
    // Nickname kontrolü
    if (empty($nickname)) {
        http_response_code(400);
        echo json_encode(['error' => 'Nickname gerekli']);
        exit;
    }
    
    $scores = readScores();
    
    // IP kontrolü - eğer bu IP'den daha düşük skor varsa güncelle
    $shouldUpdate = true;
    $existingIndex = -1;
    
    foreach ($scores as $index => $existingScore) {
        if ($existingScore['ip'] === $userIP) {
            $existingIndex = $index;
            if ($existingScore['percentage'] >= $percentage) {
                $shouldUpdate = false;
            }
            break;
        }
    }
    
    if ($shouldUpdate) {
        $newScore = [
            'ip' => $userIP,
            'nickname' => $nickname,
            'score' => $score,
            'totalQuestions' => $totalQuestions,
            'percentage' => $percentage,
            'difficulty' => $difficulty,
            'categories' => array_slice($categories, 0, 3), // Max 3 kategori göster
            'date' => date('Y-m-d H:i:s'),
            'timestamp' => time()
        ];
        
        if ($existingIndex >= 0) {
            $scores[$existingIndex] = $newScore;
        } else {
            $scores[] = $newScore;
        }
        
        // En iyi 100 skoru tut
        usort($scores, function($a, $b) {
            if ($a['percentage'] === $b['percentage']) {
                return $b['timestamp'] - $a['timestamp']; // Aynı yüzdeyse yeni olanı üstte
            }
            return $b['percentage'] - $a['percentage'];
        });
        
        $scores = array_slice($scores, 0, 100);
        
        writeScores($scores);
        
        echo json_encode([
            'success' => true,
            'message' => $existingIndex >= 0 ? 'Skor güncellendi!' : 'Skor kaydedildi!',
            'rank' => array_search($newScore, $scores) + 1
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Mevcut skorunuz daha yüksek'
        ]);
    }
}

// Skor listesi getirme
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $scores = readScores();
    
    // IP bilgisini kaldır (güvenlik)
    $publicScores = array_map(function($score) {
        unset($score['ip']);
        return $score;
    }, $scores);
    
    echo json_encode([
        'scores' => array_slice($publicScores, 0, 50), // En iyi 50'yi göster
        'total' => count($scores)
    ]);
}

else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>