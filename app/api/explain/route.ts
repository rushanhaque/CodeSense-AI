import { NextRequest, NextResponse } from 'next/server';

// Hugging Face Inference API - FREE, no API key required
const HF_API_URL = 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct';

export async function POST(req: NextRequest) {
  try {
    const { code, language } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    // Try AI explanation first
    try {
      const prompt = `You are a code teacher. Explain this ${language || 'code'} line by line in simple terms for beginners.

Code:
${code}

Provide explanations in this exact JSON format:
[{"lineNumber": 1, "code": "actual line", "explanation": "simple explanation"}]

Return ONLY the JSON array.`;

      const response = await fetch(HF_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 1500,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      });

      if (response.ok) {
        const aiResult = await response.json();
        let aiText = '';
        
        if (Array.isArray(aiResult) && aiResult[0]?.generated_text) {
          aiText = aiResult[0].generated_text;
        } else if (typeof aiResult === 'string') {
          aiText = aiResult;
        }

        // Try to extract JSON from AI response
        const jsonMatch = aiText.match(/\[\s*{[\s\S]*}\s*\]/);
        if (jsonMatch) {
          const explanations = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ explanations, source: 'ai' });
        }
      }
    } catch (aiError) {
      console.log('AI failed, falling back to rule-based:', aiError);
    }

    // Fallback to rule-based explanations
    // Helper function to get simple explanation
    const getExplanation = (line: string, lineNum: number, lang: string): string => {
      const trimmed = line.trim();
      const lower = trimmed.toLowerCase();
      
      // Empty lines
      if (!trimmed) {
        return 'Empty line - used for spacing to make code more readable.';
      }
      
      // HTML specific
      if (lang === 'html') {
        if (trimmed.startsWith('<!DOCTYPE')) {
          return 'Declares this is an HTML5 document - tells the browser how to read this file.';
        }
        if (trimmed.startsWith('<html')) {
          return 'Opening HTML tag - marks the beginning of the HTML document.';
        }
        if (trimmed.startsWith('</html>')) {
          return 'Closing HTML tag - marks the end of the HTML document.';
        }
        if (trimmed.startsWith('<head')) {
          return 'Head section - contains information about the page like title and links to styles.';
        }
        if (trimmed.startsWith('<body')) {
          return 'Body section - contains all the visible content users see on the webpage.';
        }
        if (trimmed.startsWith('<div')) {
          return 'Division element - a container used to group and organize other elements.';
        }
        if (trimmed.startsWith('<p')) {
          return 'Paragraph element - displays a block of text.';
        }
        if (trimmed.startsWith('<h1')) {
          return 'Heading level 1 - the largest and most important heading on the page.';
        }
        if (trimmed.match(/<h[2-6]/)) {
          return `Heading element - displays a title or section header (smaller than h1).`;
        }
        if (trimmed.startsWith('<a ')) {
          return 'Anchor/link element - creates a clickable link to another page or location.';
        }
        if (trimmed.startsWith('<img')) {
          return 'Image element - displays a picture on the webpage.';
        }
        if (trimmed.startsWith('<ul')) {
          return 'Unordered list - creates a bulleted list of items.';
        }
        if (trimmed.startsWith('<ol')) {
          return 'Ordered list - creates a numbered list of items.';
        }
        if (trimmed.startsWith('<li')) {
          return 'List item - one item in a list.';
        }
        if (trimmed.startsWith('<button')) {
          return 'Button element - creates a clickable button.';
        }
        if (trimmed.startsWith('<input')) {
          return 'Input field - allows users to enter data like text or numbers.';
        }
        if (trimmed.startsWith('<form')) {
          return 'Form element - collects and submits user input data.';
        }
        if (trimmed.startsWith('<script')) {
          return 'Script tag - links or contains JavaScript code.';
        }
        if (trimmed.startsWith('<style')) {
          return 'Style tag - contains CSS styling rules for the page.';
        }
        if (trimmed.startsWith('<link')) {
          return 'Link tag - connects external files like CSS stylesheets to this page.';
        }
      }
      
      // CSS specific
      if (lang === 'css') {
        if (trimmed.includes('{')) {
          const selector = trimmed.split('{')[0].trim();
          return `Starts styling rules for "${selector}" - everything inside will style these elements.`;
        }
        if (trimmed === '}') {
          return 'Ends the styling rules for this selector.';
        }
        if (trimmed.includes('color:')) {
          return 'Sets the text color of the element.';
        }
        if (trimmed.includes('background')) {
          return 'Sets the background color or image of the element.';
        }
        if (trimmed.includes('font-size')) {
          return 'Sets how large the text appears.';
        }
        if (trimmed.includes('margin')) {
          return 'Sets the outer spacing around the element.';
        }
        if (trimmed.includes('padding')) {
          return 'Sets the inner spacing inside the element.';
        }
        if (trimmed.includes('display')) {
          return 'Controls how the element is displayed (block, inline, flex, etc.).';
        }
        if (trimmed.includes('width') || trimmed.includes('height')) {
          return 'Sets the size (dimensions) of the element.';
        }
        if (trimmed.includes('border')) {
          return 'Adds a border (outline) around the element.';
        }
        if (trimmed.includes('position')) {
          return 'Controls how the element is positioned on the page.';
        }
        if (trimmed.endsWith(';')) {
          return 'Applies a CSS style property to the selected elements.';
        }
      }
      
      // C/C++ specific
      if (lang === 'c' || lang === 'cpp') {
        if (trimmed.startsWith('#include')) {
          return 'Includes a library file - adds pre-written code we can use in our program.';
        }
        if (trimmed.startsWith('#define')) {
          return 'Defines a constant or macro - creates a shortcut name for a value.';
        }
        if (trimmed.includes('int main(')) {
          return 'Main function - the starting point where the program begins execution.';
        }
        if (trimmed.includes('printf(') || trimmed.includes('cout <<')) {
          return 'Prints output to the screen - displays information to the user.';
        }
        if (trimmed.includes('scanf(') || trimmed.includes('cin >>')) {
          return 'Reads input from the user - gets data entered by the person using the program.';
        }
        if (trimmed.includes('malloc(') || trimmed.includes('new ')) {
          return 'Allocates memory dynamically - reserves space in memory at runtime.';
        }
        if (trimmed.includes('free(') || trimmed.includes('delete ')) {
          return 'Frees allocated memory - releases memory back to the system.';
        }
        if (trimmed.includes('struct ')) {
          return 'Defines a structure - a custom data type that groups different variables together.';
        }
        if (trimmed.includes('sizeof(')) {
          return 'Returns the size in bytes of a data type or variable.';
        }
        if (trimmed.includes('->')) {
          return 'Pointer member access - accesses a member of a structure through a pointer.';
        }
        if (trimmed.includes('NULL')) {
          return 'NULL pointer - represents no valid memory address.';
        }
      }
      
      // Comments (all languages)
      if (trimmed.startsWith('//')) {
        return `Comment: "${trimmed.slice(2).trim()}" - This note explains the code but doesn't execute.`;
      }
      if (trimmed.startsWith('#') && !trimmed.startsWith('#include') && !trimmed.startsWith('#define')) {
        return `Comment: "${trimmed.slice(1).trim()}" - This explains what the code does without running.`;
      }
      if (trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('*/')) {
        return 'Part of a multi-line comment block that describes the code.';
      }
      if (trimmed.startsWith('<!--')) {
        return 'HTML comment - note for developers that won\'t appear on the webpage.';
      }
      if (trimmed.startsWith('"""') || trimmed.startsWith("'''")) {
        return 'Documentation string that describes what this code does.';
      }
      
      // Function declarations
      if (lower.includes('function ')) {
        const match = trimmed.match(/function\s+(\w+)/);
        const funcName = match ? match[1] : 'a function';
        return `Defines ${funcName} - a reusable block of code that performs a specific task. You can call it later to run this code.`;
      }
      if (lower.includes('def ')) {
        const match = trimmed.match(/def\s+(\w+)/);
        const funcName = match ? match[1] : 'a function';
        return `Creates the function "${funcName}" - think of it as a recipe that can be used whenever needed.`;
      }
      if (trimmed.includes('=>')) {
        return 'Arrow function - a shorter way to write a function that performs a task.';
      }
      
      // Variable declarations
      if (lower.includes('const ')) {
        const match = trimmed.match(/const\s+(\w+)/);
        const varName = match ? match[1] : 'a constant';
        return `Creates "${varName}" as a constant - a container that stores a value that won't change.`;
      }
      if (lower.includes('let ')) {
        const match = trimmed.match(/let\s+(\w+)/);
        const varName = match ? match[1] : 'a variable';
        return `Creates "${varName}" as a variable - a container that stores data which can be changed later.`;
      }
      if (lower.includes('var ')) {
        const match = trimmed.match(/var\s+(\w+)/);
        const varName = match ? match[1] : 'a variable';
        return `Declares "${varName}" - an older way to create a variable that stores data.`;
      }
      
      // Control flow
      if (lower.includes('if (') || lower.includes('if(')) {
        return 'Checks a condition - if it\'s true, the code inside will run. Like asking "Is this true?"';
      }
      if (trimmed.startsWith('else if')) {
        return 'Checks another condition - runs if the previous "if" was false but this one is true.';
      }
      if (trimmed.startsWith('else')) {
        return 'The backup plan - runs only if all previous conditions were false.';
      }
      if (lower.includes('switch')) {
        return 'Starts a switch statement - checks one value against multiple options, like a menu.';
      }
      if (trimmed.startsWith('case ')) {
        return 'One option in the switch - if the value matches this, run this code.';
      }
      if (trimmed.startsWith('default')) {
        return 'Default case - runs if none of the other options matched.';
      }
      
      // Loops
      if (lower.includes('for (') || lower.includes('for(')) {
        return 'Starts a "for" loop - repeats the code inside a specific number of times.';
      }
      if (lower.includes('while (') || lower.includes('while(')) {
        return 'Starts a "while" loop - keeps repeating as long as a condition stays true.';
      }
      if (lower.includes('for ') && lower.includes(' in ')) {
        return 'Loops through each item in a collection, processing them one by one.';
      }
      if (lower.includes('.foreach') || lower.includes('.map')) {
        return 'Goes through each item in a list and does something with it.';
      }
      
      // Return statements
      if (trimmed.startsWith('return ')) {
        const value = trimmed.slice(7).trim();
        return `Returns ${value || 'a value'} back to whoever called this function - like giving an answer.`;
      }
      if (trimmed === 'return') {
        return 'Exits the function and goes back to where it was called from.';
      }
      
      // Import/Export
      if (lower.includes('import ')) {
        return 'Brings in code from another file or library so we can use it here.';
      }
      if (lower.includes('from ') && lower.includes('import')) {
        return 'Imports specific parts from another file to use in this code.';
      }
      if (lower.includes('require(')) {
        return 'Loads code from another file or package to use here (older style).';
      }
      if (trimmed.startsWith('export ')) {
        return 'Makes this code available for other files to import and use.';
      }
      
      // Class declarations
      if (lower.includes('class ')) {
        const match = trimmed.match(/class\s+(\w+)/);
        const className = match ? match[1] : 'a class';
        return `Defines the ${className} class - a blueprint for creating objects with specific properties and behaviors.`;
      }
      if (trimmed.startsWith('constructor')) {
        return 'Constructor - special function that runs when creating a new object from this class.';
      }
      if (lower.includes('extends ')) {
        return 'Inherits features from another class - like a child learning from a parent.';
      }
      
      // Common methods
      if (lower.includes('console.log') || lower.includes('print(')) {
        return 'Displays information on the screen or console - useful for seeing what\'s happening.';
      }
      if (lower.includes('.length')) {
        return 'Gets the length or size - how many items are in the collection.';
      }
      if (lower.includes('.push(')) {
        return 'Adds a new item to the end of a list/array.';
      }
      if (lower.includes('.pop(')) {
        return 'Removes and returns the last item from a list/array.';
      }
      if (lower.includes('.split(')) {
        return 'Splits text into pieces based on a separator, creating an array.';
      }
      if (lower.includes('.join(')) {
        return 'Combines array items into one text string, separated by a character.';
      }
      
      // Async/Await
      if (lower.includes('async ')) {
        return 'Marks this as an asynchronous function - it can wait for things without freezing the program.';
      }
      if (lower.includes('await ')) {
        return 'Waits for a promise to finish before continuing - like waiting for a response.';
      }
      if (lower.includes('.then(')) {
        return 'Runs code after a promise completes successfully.';
      }
      if (lower.includes('.catch(')) {
        return 'Handles errors if something goes wrong in the promise.';
      }
      
      // Try/Catch
      if (trimmed.startsWith('try')) {
        return 'Tries to run code that might cause an error - if it fails, catch handles it.';
      }
      if (trimmed.startsWith('catch')) {
        return 'Catches and handles errors from the try block - prevents the program from crashing.';
      }
      if (trimmed.startsWith('finally')) {
        return 'Always runs after try/catch, whether there was an error or not.';
      }
      
      // Brackets and structure
      if (trimmed === '{') {
        return 'Opening brace - starts a new block of related code.';
      }
      if (trimmed === '}') {
        return 'Closing brace - ends the current code block.';
      }
      if (trimmed === '};') {
        return 'Closing brace with semicolon - ends the code block and statement.';
      }
      
      // Assignment and operators
      if (trimmed.includes('===') || trimmed.includes('==')) {
        return 'Compares if two values are equal - returns true or false.';
      }
      if (trimmed.includes('!==') || trimmed.includes('!=')) {
        return 'Checks if two values are NOT equal.';
      }
      if (trimmed.includes('&&')) {
        return 'AND operator - both conditions must be true.';
      }
      if (trimmed.includes('||')) {
        return 'OR operator - at least one condition must be true.';
      }
      if (trimmed.includes('++')) {
        return 'Increases the value by 1 - shorthand for adding one.';
      }
      if (trimmed.includes('--')) {
        return 'Decreases the value by 1 - shorthand for subtracting one.';
      }
      if (trimmed.includes('+=')) {
        return 'Adds to the current value and updates it.';
      }
      if (trimmed.includes('-=')) {
        return 'Subtracts from the current value and updates it.';
      }
      
      // Default cases
      if (trimmed.includes('=') && !trimmed.includes('==')) {
        return 'Assigns a value - puts the right side into the left side variable.';
      }
      
      // Generic fallback
      if (trimmed.endsWith(';')) {
        return `Executes a statement in ${lang || 'this programming language'} and ends with a semicolon.`;
      }
      
      return `A line of ${lang || 'code'} that performs an operation or calculation.`;
    };
    
    // Fallback to rule-based explanations
    const lines = code.split('\n');
    const explanations = lines.map((line: string, index: number) => {
      return {
        lineNumber: index + 1,
        code: line,
        explanation: getExplanation(line, index + 1, language || 'code')
      };
    });

    return NextResponse.json({ explanations, source: 'rule-based' });
  } catch (error: unknown) {
    console.error('Error explaining code:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to explain code' },
      { status: 500 }
    );
  }
}
