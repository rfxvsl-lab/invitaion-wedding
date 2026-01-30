# Convert HTML templates to TypeScript exports
# This ensures templates are bundled in Vercel deployment

$templatesDir = "lib\templates"
$files = Get-ChildItem -Path $templatesDir -Filter "*.html"

Write-Host "Converting $($files.Count) HTML templates to TypeScript..."

foreach ($file in $files) {
    $htmlPath = $file.FullName
    $tsPath = $htmlPath -replace '\.html$', '.ts'
    
    $htmlContent = Get-Content -Path $htmlPath -Raw -Encoding UTF8
    
    # Escape backticks and dollar signs for template literal
    $escapedContent = $htmlContent -replace '`', '\\`' -replace '\$', '\\$'
    
    $templateName = $file.BaseName
    
    $tsContent = @"
// Auto-generated template export
// Template: $templateName

export const template = ``$escapedContent``;
"@
    
    Set-Content -Path $tsPath -Value $tsContent -Encoding UTF8
    Write-Host "✓ Created $($file.BaseName).ts"
}

Write-Host "`n✅ All templates converted!"
Write-Host "`nNext: Update generator.ts to import from .ts files"
