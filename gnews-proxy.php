<?php
// ================================
// GNEWS API PROXY - SEGURO
// ================================

// Impede acesso direto indevido
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// 🔐 SUA API KEY (NUNCA coloque no JS)
$API_KEY = "2d4cba603a9063a0a53a954b1f7aff18";

// Endpoint da GNews
$url = "https://gnews.io/api/v4/top-headlines?" . http_build_query([
    "lang" => "pt",
    "topic" => "health",
    "max" => 4,
    "apikey" => $API_KEY
]);

// Requisição segura
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Tratamento de erro
if ($httpCode !== 200 || !$response) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Erro ao buscar notícias"
    ]);
    exit;
}

// Retorno limpo
echo $response;
