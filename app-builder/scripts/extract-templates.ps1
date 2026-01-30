# Extract templates from templates-data.js to individual HTML files
# Run with: .\scripts\extract-templates.ps1

$ErrorActionPreference = "Stop"

$templatesFile = Join-Path $PSScriptRoot "..\lib\templates-data.js"
$outputDir = Join-Path $PSScriptRoot "..\public\templates"

# Create output directory
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    Write-Host "✓ Created directory: $outputDir" -ForegroundColor Green
}

# Read the entire file
$content = Get-Content $templatesFile -Raw

# Extract template names first to know what we're looking for
Write-Host "`nExtracting templates..." -ForegroundColor Cyan

$templateNames = @(
    'luxury-dark',
    'rustic-wood',
    'pixel-art',
    'magic-love',
    'cartoon-cars',
    'cartoon-spongebob',
    'cartoon-avatar',
    'streaming-netflix',
    'streaming-cinema',
    'tradition-javanese',
    'tradition-minang',
    'tradition-balinese',
    'regular-invitation'
)

$extracted = 0

foreach ($templateName in $templateNames) {
    Write-Host "Processing: $templateName..." -NoNewline
    
    # Find the template content using regex
    # Match pattern: 'template-name': `...` or 'template-name': '...'
    $pattern = "'\s*$templateName\s*':\s*[``'](.+?)[``']\s*,?\s*(?='|};)"
    
    if ($content -match $pattern) {
        $htmlContent = $Matches[1]
        
        # Basic cleanup of escape sequences
        $htmlContent = $htmlContent -replace "\\'", "'"
        $htmlContent = $htmlContent -replace '\\"', '"'
        
        $outputFile = Join-Path $outputDir "$templateName.html"
        
        try {
            # Write with UTF8 encoding
            [System.IO.File]::WriteAllText($outputFile, $htmlContent, [System.Text.Encoding]::UTF8)
            Write-Host " ✓" -ForegroundColor Green
            $extracted++
        }
        catch {
            Write-Host " ✗ Failed: $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host " ✗ Not found in file" -ForegroundColor Yellow
    }
}

Write-Host "`n✓ Successfully extracted $extracted of $($templateNames.Count) templates" -ForegroundColor Green
Write-Host "Output directory: $outputDir" -ForegroundColor Cyan
