roles = [{
    "id" : "admin",
    "name" : "ادمین",
    "inherit" :["mark"]
},
{
    "id" : "mark",
    "name" : "نمرات",
    "inherit" :["report","dashboard"]
},
{
    "id" : "report",
    "name" : "کارنامه",
    "inherit" :["dashboard"]
},
{
    "id" : "dashboard",
    "name" : "داشبورد",
    "inherit" :[]
},
{
    "id" : "visitor",
    "name" : "بازدید کننده",
    "inherit" :["dashboard"]
}





]