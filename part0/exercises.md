
## 0.4: New note diagram
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note left of server: the server adds in the new note
    server-->>-browser: redirect to https://studies.cs.helsinki.fi/exampleapp/notes
    Note right of browser: the browser then follow the redirect, leading to the same sequence of events depicted in the lesson

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Note left of server: the server constructs the list of notes which now includes the new note
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

## 0.5: Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server-->>-browser: HTML document

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>-browser: the css file

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server-->>-browser: the JavaScript file

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>+server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>-browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]

    Note right of browser: The browser executes the callback function that renders the notes
```

## 0.6: New note in Single page app diagram
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser creates the new note then rerender with DOM API
    browser->>+server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    server-->>-browser: {message: "note created"}
```