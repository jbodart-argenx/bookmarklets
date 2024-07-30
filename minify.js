const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const uglifyJS = require('uglify-js');

// Function to convert a Human-readable JavaScript code to a minified .js file
function convertBookmarklet(inputFile, outputFile, preserveNames = true) {
    // Read the javascript from the input file
    const jsCode = fs.readFileSync(inputFile, 'utf8');

    // Minify the JavaScript code
    let minifiedCode = "";
    if (preserveNames) {
        // Remove leading/trailing whitespace
        minifiedCode = jsCode.trim();
        // Replace multiple spaces with a single space
        minifiedCode = minifiedCode.replace(/\s+/g, ' ');
        // Remove space around certain characters
        minifiedCode = minifiedCode.replace(/\s*([{};,:()=])\s*/g, '$1');
        // Ensure space after certain keywords
        minifiedCode = minifiedCode.replace(/\b(function|if|else|for|while|switch|case|return|let|const|var)\s+/g, '$1 ');
    } else {
        minifiedCode = uglifyJS.minify(jsCode).code;
    }
    
    // URL-encode the minified JavaScript code
    const bookmarkletCode = 'javascript:' + querystring.escape(minifiedCode);

    // Write the minified bookmarklet code to the output file
    fs.writeFileSync(outputFile, bookmarkletCode, 'utf8');

    console.log(`Minified JavaScript code saved to: ${outputFile}`);

}


// Function to get contents of a directory
function getDirectoryContents(dirPath
                            ,fileCallBack = (file) => console.log(`[FILE] ${file}`)
                            ,dirCallBack = (dir) => console.log(`[DIR] ${dir}`)
) {
    // Resolve the full path
    const fullPath = path.resolve(__dirname, dirPath);

    // Read the directory contents
    fs.readdir(fullPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return;
        }

        // Process the contents
        files.forEach(file => {
            const filePath = path.join(fullPath, file);
            const fileStat = fs.statSync(filePath);

            if (fileStat.isDirectory()) {
                dirCallBack(file, fullPath, fileStat);
            } else {
                fileCallBack(file, fullPath, fileStat);
            }
        });
    });
}

// Get contents of the 'beautified' subdirectory within the current project
// and save a beautified version in the 'minified' subfolder
getDirectoryContents('beautified', 
    (file, fullPath, fileStat) => {
        const inFile = path.join(fullPath, file);
        const outFile = path.join(path.dirname(fullPath), 'minified', file);
        convertBookmarklet(inFile, outFile);
    });