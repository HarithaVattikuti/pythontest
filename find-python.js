const tc = require('@actions/tool-cache');
const core = require('@actions/core');

async function findPython() {
    try {
        // Define the tool name and version
        const toolName = 'Python';
        const versionSpec = '3.12.13'; // Replace with the desired version
        const arch = process.arch;

        // Find the Python path in the tool cache
        const pythonPath = tc.find(toolName, versionSpec, arch);

        if (!pythonPath) {
            console.log(`Python ${versionSpec} not found in the tool cache.`);
            return;
        }

        // Construct the full path to the Python executable
        const fullPath = `${pythonPath}/bin/python3.12`;
        console.log(`Python full path: ${fullPath}`);

        // Export the path as an environment variable
        core.exportVariable('PYTHON_PATH', fullPath);
    } catch (error) {
        console.error(`Error finding Python: ${error.message}`);
    }
}

findPython();
