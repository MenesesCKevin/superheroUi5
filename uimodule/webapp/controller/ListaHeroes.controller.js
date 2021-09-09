sap.ui.define(["com/bmore/superheroes/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "thirdparty/axios/dist/axios.min"],
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.bmore.superheroes.controller.ListaHeroes", {
      onInit: function () {
        this.heros = new JSONModel({ hero: [] });
        this.setModel(this.heros, "HerosModel");
        this.obtieneHero();
      },
      crear: async function(){
        let oringPlace= this.byId("combo").getValue();
        let birthdayDate= this.byId("birthdayDate").getValue();
        let alterName= this.byId("alterName").getValue();
        let birthName= this.byId("birthName").getValue();
        let superPower= this.byId("superPower").getValue();
        let id =1;
        const request = {
          "superheroId": id,
          "birthName": birthName,
          "alterName": alterName,
          "birthdayDate": birthdayDate,
          "originPlace": oringPlace,
          "superPower": superPower
        };
        console.log(request);
        try {
          await this.setHero(request);
        } catch (error) {
          console.log(error);
        }

      },
      obtieneHero: async function () {
        try {
          let heros = await this.getHero();
          this.heros.setProperty("/hero", heros);
          console.log(this.heros);
        } catch (e) {
          console.log(e);
        }
      },
     
      getHero: function () {
        return new Promise((resolve, reject) => {
          const service = "http://localhost:8080/read";
          axios.get(service)
            .then((response) => {
              console.log(response.data);
              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      setHero: function (request) {
        return new Promise((resolve, reject) => {
          const service = "http://localhost:8080/create";
          
          axios.post(service, request, {})
            .then((response) => {
              console.log(response);
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },

    });
  });
