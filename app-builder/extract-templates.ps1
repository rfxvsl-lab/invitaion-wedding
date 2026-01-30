# PowerShell script to extract templates
$ErrorActionPreference = "Stop"

$content = Get-Content -Path "lib\templates-data.ts" -Raw -Encoding UTF8

Write-Host "Total file size: $($content.Length) bytes"
Write-Host ""

# Use regex to find each template section
$regex = [regex]"'([a-z-]+)':\s*[`'](!DOCTYPE[\s\S]*?)['`]\s*,?\s*//"

$matches = $regex.Matches($content)

Write-Host "Found $($matches.Count) template matches"
Write-Host ""

foreach ($match in $matches) {
    if ($match.Success) {
        $templateName = $match.Groups[1].Value
        $templateHtml = $match.Groups[2].Value
        
        # Add back the < character
        $templateHtml = "<" + $templateHtml
        
        $outputPath = "public\templates\$templateName.html"
        
        # Write the file
        [System.IO.File]::WriteAllText($outputPath, $templateHtml, [System.Text.Encoding]::UTF8)
        
        $fileSize = (Get-Item $outputPath).Length
        Write-Host "Extracted $templateName - $fileSize bytes"
    }
}

Write-Host ""
Write-Host "Done!"
