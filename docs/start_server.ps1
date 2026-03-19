$port = 8080
$root = "d:\projects\test\docs"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:${port}/")
$listener.Start()

$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch 'Loopback' -and $_.IPAddress -ne '127.0.0.1' } | Select-Object -First 1).IPAddress
Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "  Server running on port $port" -ForegroundColor Green
Write-Host "  Phone: http://${ip}:${port}/M1_V3_plan.html" -ForegroundColor Yellow
Write-Host "  PC:    http://localhost:${port}/M1_V3_plan.html" -ForegroundColor Yellow
Write-Host "  Press Ctrl+C to stop" -ForegroundColor Gray
Write-Host "====================================" -ForegroundColor Green
Write-Host ""

while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = $ctx.Request.Url.LocalPath.TrimStart("/")
    if (-not $path) { $path = "M1_V3_plan.html" }
    
    $file = Join-Path $root $path
    
    if (Test-Path $file -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $ext = [System.IO.Path]::GetExtension($file).ToLower()
        $mime = switch ($ext) {
            ".html" { "text/html; charset=utf-8" }
            ".css"  { "text/css" }
            ".js"   { "application/javascript" }
            ".png"  { "image/png" }
            ".jpg"  { "image/jpeg" }
            ".md"   { "text/plain; charset=utf-8" }
            default { "application/octet-stream" }
        }
        $ctx.Response.ContentType = $mime
        $ctx.Response.ContentLength64 = $bytes.Length
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        Write-Host "[200] $path" -ForegroundColor Green
    } else {
        $ctx.Response.StatusCode = 404
        Write-Host "[404] $path" -ForegroundColor Red
    }
    $ctx.Response.Close()
}
