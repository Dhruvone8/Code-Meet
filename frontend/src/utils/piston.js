const PISTON_API = "https://emkc.org/api/v2/piston"

const LANGUAGE_VERSIONS = {
    cpp: { language: "cpp", version: "17.0.0" },
    python: { language: "python", version: "3.11.0" },
    java: { language: "java", version: "15.0.2" }
}

export async function executeCode(language, code) {
    try {
        const languageConfig = LANGUAGE_VERSIONS[language];

        if (!languageConfig) {
            return {
                success: false,
                error: "Unsupported Language"
            }
        }

        const response = await fetch(`${PISTON_API}/execute`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language: languageConfig.language,
                version: languageConfig.version,
                files: [
                    {
                        name: `main.${getFileExtension(language)}`,
                        content: code
                    }
                ]
            })
        })

        if (!response.ok) {
            return {
                success: false,
                error: "Failed to execute code"
            }
        }

        const data = await response.json();
        const output = data.run.output || "";

        const stderr = data.run.stderr || ""

        if (stderr) {
            return {
                success: false,
                output: output,
                error: stderr
            }
        }
        return {
            success: true,
            output: output
        };

    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
}

function getFileExtension(language) {
    const extensions = {
        java: "java",
        cpp: "cpp",
        python: "py"
    }

    return extensions[language] || "txt";
}
