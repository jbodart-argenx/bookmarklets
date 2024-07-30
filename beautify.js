const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const beautify = require('js-beautify').js;

// Function to convert a bookmarklet to a readable .js file
function convertBookmarklet(inputFile, outputFile) {
    // Read the bookmarklet from the input file
    const bookmarkletCode = fs.readFileSync(inputFile, 'utf8');

    // Remove the 'javascript:' prefix
    let encodedJS = bookmarkletCode;
    if (encodedJS.startsWith('javascript:')) {
        encodedJS = encodedJS.substring('javascript:'.length);
    }

    // URL-decode the JavaScript code
    const decodedJS = querystring.unescape(encodedJS);

    // Beautify the JavaScript code
    const beautifiedJS = beautify(decodedJS, { indent_size: 2, space_in_empty_paren: true });

    if (outputFile) {
        // Write the beautified code to the output file
        fs.writeFileSync(outputFile, beautifiedJS, 'utf8');

        console.log(`Beautified JavaScript code saved to: ${outputFile}`);
    } else {
        console.log(`Beautified JavaScript code:\n\n ${beautifiedJS}`)
    }
}

// Example usage
// const inputFilePath = 'path/to/your/bookmarklet.txt'; // Replace with the path to your bookmarklet file
// const outputFilePath = 'output.js'; // Replace with the desired output file path

// convertBookmarklet(inputFilePath, outputFilePath);


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

// Get contents of the 'minified' subdirectory within the current project
// and save a beautified version in the 'beautified' subfolder
getDirectoryContents('minified', 
    (file, fullPath, fileStat) => {
        const inFile = path.join(fullPath, file);
        const outFile = path.join(path.dirname(fullPath), 'beautified', file);
        if (fs.existsSync(outFile)) {
            console.log(`Kept existing file unchanged: ${outFile}`);
            convertBookmarklet(inFile);
        } else {
            convertBookmarklet(inFile, outFile);
        }
    });