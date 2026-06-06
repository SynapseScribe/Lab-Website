1. The environment is Windows and the shell is PowerShell, so use commands compatible with pwsh, not linux commands. Always use pwsh commands when listing files or reading their content.
2. In each reply execute, using the tool, the `git status --verbose` command. Execute this, not just write it, but actually execute it using pwsh shell. Run this command just before you write your reply. The reply must start with "Bn coae coae. Asa facem.". Calling a tool doesn't count as a "reply". A reply is what you'll do after I write.
3.Whenever the user says "Lookin' crispy", you must stage the changes (add), then commit (with a relevant description) and then push to master on the remote to the master branch.
4. When using the edit tool, use small, unique substrings for oldString to avoid matching errors caused by whitespace or line endings.
5. Never edit files unless I say so. When i ask you to restore the changes as they were just before your changes, use `git reset --hard HEAD && git clean -f`
6. If an edit fails because the `oldString` was not found, re-read the file to verify its current content and try again with a different, more precise substring.
7. Never use the `edit` tool if `oldString` and `newString` are identical.
8. When using the `edit` tool, be mindful of CRLF vs LF line endings to ensure `oldString` matches exactly.
9. Try to prioritise the use of `write` tool and always set the filePath, instead of the `edit` tool which might be less reliable.
10. When performing edits that involve multiple lines or sections, always verify that no surrounding code or intended content is accidentally deleted or replaced.
11. Do not introduce typos, don't get stuck in thinking loops, focus on the task and try not to make mistakes.
12. To check if a file has CRLF or LF line endings in PowerShell, use: (Get-Content -Raw "filename") -match "`r"
13. Avoid redundant tool calls within a single response.
14. ask user a follow-up question when you have an important doubt, where user input would be beneficial for task completion. But try not to do this very often.