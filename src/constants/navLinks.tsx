const navLinks =[
  {
    route:"/",
    label:"Home"
  },
   {
    route:"/contact",
    label:"contact"
  },
   {
    route:"/features",
    label:"features"
  },
   {
    route:"/pricing",
    label:"pricing"
  },
   {
    route:"/more",
    label:"more",
    subMenu: [
        {
        route:"/resturants",
        label:"resturants",
        },

        {
        route:"/chefs",
        label:"chefs",
        },
    ],
  },

]

export default navLinks;