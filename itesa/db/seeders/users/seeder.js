const axios=require("axios")
axios.defaults.baseURL="http://localhost:3000/api"

const seeder=axios.create({
    baseURL:"http://localhost:3000/api"
})

var newUsers=[
  {nick_name:"Alesito",email:"alefornieles@gmail.com",password:"1234",referring:"",admin:true},
  {nick_name:"Tincho",email:"martin.hofmann95@gmail.com",password:"1234",referring:"",admin:true},
  {nick_name:"Bauti",email:"bautistagonzalezlazo@gmail.com",password:"1234",referring:"",admin:true},
  {nick_name:"Santi",email:"santiagocaballero1747@gmail.com",password:"1234",referring:"",admin:true},
  {nick_name:"Elbola",email:"elbolaestevez@gmail.com",password:"1234",referring:"",admin:true},
  {nick_name:"Fran",email:"francostan98@gmail.com",password:"1234",referring:"",admin:true},
  {nick_name:"referAle1",email:"referAle1@mail.com",password:"1234",referring:"viral.Alesito"},
  {nick_name:"referAle2",email:"referAle2@mail.com",password:"1234",referring:"viral.Alesito"},
  {nick_name:"referAle3",email:"referAle3@mail.com",password:"1234",referring:"viral.Alesito"},
  {nick_name:"referAle4",email:"referAle4@mail.com",password:"1234",referring:"viral.Alesito"},
  {nick_name:"referAle5",email:"referAle5@mail.com",password:"1234",referring:"viral.Alesito"},
  {nick_name:"referAle6",email:"referAle6@mail.com",password:"1234",referring:"viral.Alesito"},
  {nick_name:"referAle7",email:"referAle7@mail.com",password:"1234",referring:"viral.Alesito"},
  {nick_name:"referTincho1",email:"referTincho1@mail.com",password:"1234",referring:"viral.Tincho"},
  {nick_name:"referTincho2",email:"referTincho2@mail.com",password:"1234",referring:"viral.Tincho"},
  {nick_name:"referTincho3",email:"referTincho3@mail.com",password:"1234",referring:"viral.Tincho"},
  {nick_name:"referBauti1",email:"referBauti1@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referBauti2",email:"referBauti2@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referBauti3",email:"referBauti3@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referBauti4",email:"referBauti4@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referBauti5",email:"referBauti5@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referBauti6",email:"referBauti6@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referBauti7",email:"referBauti7@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referBauti8",email:"referBauti8@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referBauti9",email:"referBauti9@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referBauti10",email:"referBauti10@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referBauti11",email:"referBauti11@mail.com",password:"1234",referring:"viral.Bauti"},
  {nick_name:"referFranco1",email:"referFranco1@mail.com",password:"1234",referring:"viral.Fran"},
  {nick_name:"referFranco2",email:"referFranco2@mail.com",password:"1234",referring:"viral.Fran"},
  {nick_name:"referFranco3",email:"referFranco3@mail.com",password:"1234",referring:"viral.Fran"},
  {nick_name:"referFranco4",email:"referFranco4@mail.com",password:"1234",referring:"viral.Fran"},
  {nick_name:"referFranco5",email:"referFranco5@mail.com",password:"1234",referring:"viral.Fran"},
  {nick_name:"referFranco6",email:"referFranco6@mail.com",password:"1234",referring:"viral.Fran"},
  {nick_name:"referFranco7",email:"referFranco7@mail.com",password:"1234",referring:"viral.Fran"},
  {nick_name:"referFranco8",email:"referFranco8@mail.com",password:"1234",referring:"viral.Fran"},
  {nick_name:"referFranco9",email:"referFranco9@mail.com",password:"1234",referring:"viral.Fran"},
  {nick_name:"referFranco10",email:"referFranco10@mail.com",password:"1234",referring:"viral.Fran"},
  {nick_name:"referFranco11",email:"referFranco11@mail.com",password:"1234",referring:"viral.Santi"},
  {nick_name:"referFranco12",email:"referFranco12@mail.com",password:"1234",referring:"viral.Santi"},
  {nick_name:"referFranco13",email:"referFranco13@mail.com",password:"1234",referring:"viral.Santi"},
  {nick_name:"referFranco14",email:"referFranco14@mail.com",password:"1234",referring:"viral.Santi"},
  {nick_name:"referFranco15",email:"referFranco15@mail.com",password:"1234",referring:"viral.Santi"},
  {nick_name:"referFranco16",email:"referFranco16@mail.com",password:"1234",referring:"viral.Santi"},
  {nick_name:"referFranco17",email:"referFranco17@mail.com",password:"1234",referring:"viral.Elbola"},
  {nick_name:"referFranco18",email:"referFranco18@mail.com",password:"1234",referring:"viral.Elbola"},
  {nick_name:"referFranco19",email:"referFranco19@mail.com",password:"1234",referring:"viral.Elbola"},
  {nick_name:"referFranco20",email:"referFranco20@mail.com",password:"1234",referring:"viral.Elbola"},
  {nick_name:"referFranco21",email:"referFranco21@mail.com",password:"1234",referring:"viral.Elbola"},
  {nick_name:"referFranco22",email:"referFranco22@mail.com",password:"1234",referring:"viral.Elbola"},
  {nick_name:"referFranco23",email:"referFranco23@mail.com",password:"1234",referring:"viral.Elbola"},
  {nick_name:"referFranco24",email:"referFranco24@mail.com",password:"1234",referring:"viral.Elbola"},
  {nick_name:"referFranco25",email:"referFranco25@mail.com",password:"1234",referring:"viral.referAle1"},
  {nick_name:"referFranco26",email:"referFranco26@mail.com",password:"1234",referring:"viral.referAle1"},
  {nick_name:"referFranco27",email:"referFranco27@mail.com",password:"1234",referring:"viral.referAle1"},
  {nick_name:"referFranco28",email:"referFranco28@mail.com",password:"1234",referring:"viral.referAle1"},
  {nick_name:"referFranco29",email:"referFranco29@mail.com",password:"1234",referring:"viral.referAle2"},
  {nick_name:"referFranco30",email:"referFranco30@mail.com",password:"1234",referring:"viral.referAle2"},
  {nick_name:"referFranco31",email:"referFranco31@mail.com",password:"1234",referring:"viral.referAle2"},
  {nick_name:"referFranco32",email:"referFranco32@mail.com",password:"1234",referring:"viral.referAle5"},
  {nick_name:"referFranco33",email:"referFranco33@mail.com",password:"1234",referring:"viral.referAle7"},
  {nick_name:"referFranco34",email:"referFranco34@mail.com",password:"1234",referring:"viral.referAle7"},
  {nick_name:"referFranco35",email:"referFranco35@mail.com",password:"1234",referring:"viral.referAle4"},
  {nick_name:"referFranco36",email:"referFranco36@mail.com",password:"1234",referring:"viral.referAle4"},
  {nick_name:"referFranco37",email:"referFranco37@mail.com",password:"1234",referring:"viral.referAle4"},
  {nick_name:"referFranco38",email:"referFranco38@mail.com",password:"1234",referring:"viral.referAle4"},
  {nick_name:"referFranco39",email:"referFranco39@mail.com",password:"1234",referring:"viral.referAle4"}
  ]


const registerPromises = newUsers.map(async (element)=>{
    return await seeder.post("http://localhost:3000/api/newUser",element)
})

const registros = Promise.all(registerPromises)