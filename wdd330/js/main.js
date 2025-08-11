const weekLinks = [
    {label: "Week 1", url: "week1/"},
    {label: "Week 2", url: "week2/"},
    {label: "Week 3", url: "week3/"}, 
    {label: "Week 4", url: "week4/"},
    {label: "Week 5", url: "week5/"},
    {label: "Midterm: Todo App", url: "todo/"},
    {label: "Week 7", url: "week7/"},
    {label: "Week 8", url: "week8/"},
    {label: "Week 9", url: "week9/"},
    {label: "Week 10", url: "week10/"},
    {label: "Week 11", url: "week11/"},
    {label: "Practice Tutorials", url: "tutorials/"},
    {label: "Final Project: Costume Inventory App", url: "costumeapp/"}
]

const notesLinks = [
    {label: "Notes", url: "notes.html"}
]

let weekList = document.getElementById('weeks');

for (let i = 0; i < weekLinks.length; i++) {
    let week = document.createElement('li');
    let a = document.createElement('a');
    let weekLink = document.createTextNode(weekLinks[i].label);
    a.appendChild(weekLink);
    a.href = weekLinks[i].url;
    week.appendChild(a);
    weekList.appendChild(week);  
}