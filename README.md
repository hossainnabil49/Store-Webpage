# Store-Webpage
Small personal web developement project where I developed a store which can simulate adding products,new stores etc

DIRECTIONS:
    first you must install the pug module and Express module using npm install pug and npm install Express in vscode (or commandline)
    then you need to run the server using node .\server.js\ and then use the following link:http://localhost:3000/ (make sure your in the correct directory)
    After that the program will show a homepage with links at the top(home,vendors,Add vendor) click whichever one you want
    vendors displays a list of vendors links, clicking a link will display a webpage similar to assignment 2, however, include different mechanics
    you can edit the name,fee and min order by just retyping what is in the textboxes
    there is a add item section which allows the user to add an item but including certain attributes press add item to add the item to the currentVendor
    there is a add category section which allows the user to add an category(checks for dupelicates) which adds category to currentVendor
    the saveItem updates the server and updates the webpage to include the new additions
    the add vendor option gives the user the option to add a vendor, just fill in the demanded attributes then hit submit and it will redirect you to a newly created vendor page, however you must fill everything and if not, then error will be sent
