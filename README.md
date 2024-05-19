# Cookie-SimpleBOT
**Bookmarklet**
```
javascript:(async function() { const scriptUrl = 'https://raw.githubusercontent.com/DeroXP/Cookie-SimpleBOT/main/simple.js'; try { const response = await fetch(scriptUrl); if (!response.ok) { throw new Error(`Failed to fetch script from ${scriptUrl}`); } const scriptText = await response.text(); if (scriptText.trim()) { try { const scriptFunction = new Function(scriptText); scriptFunction(); console.log('Script executed successfully'); } catch (executionError) { console.error('Execution error:', executionError.message); } } else { throw new Error('Fetched script is empty'); } } catch (error) { console.error('Error:', error.message); }})();
```
