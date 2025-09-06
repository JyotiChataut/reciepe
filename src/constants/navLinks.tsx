const navLinks =[
  {
    route:"/",
    label:"Home",
    isAuth:false
  },
   {
    route:"/contact",
    label:"contact",
      isAuth:false
  },
   {
    route:"/features",
    label:"features",  isAuth:false
  },


   {
    route:"/receipe",
    label:"receipe",
    isAuth:true,

       
  },

  
   {
    route:"/more",
      isAuth:false,
    label:"more",
    
    subMenu: [
        {
        route:"/more/resturants",
        label:"resturants",
          
        },

        {
        route:"/more/chefs",
        label:"chefs",
          
        },
    ],
  },

]

export default navLinks;