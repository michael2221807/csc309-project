import React from "react";

import Nav2 from "../Nav2";
import api from "../../api"

import "./styles.css";

import background from "./background.jpg";
import dragonite from "../Store/dragonite.gif";

class Dragonite extends React.Component{

    state = {
            isLoading: false,

            username: "user",
            password: "user",

            users: [],
            currentUser: []
    };

    componentDidMount = async () => {
        
        // console.log(this.state.currentUser)

        this.setState({ isLoading: true })

        await api.getAllUsers().then(users => {
            this.setState({
                users: users.data.data
            })
        })

        const userlist = this.state.users
        userlist.map(u => {
            if (u.isCurrent) {
                // console.log(u)
                this.state.currentUser = []
                this.state.currentUser.push(u)
                this.setState({
                    currentUser: this.state.currentUser,
                    isLoading: false
                })
               
            }
            this.setState({ isLoading: false })
        })
        // console.log(this.state.currentUser)

    };

    buyPokemon = async () => {
        
        // we need to update the currentUser info...
        //create a new Pokemon item, and add it to user
        //reduce the money users have
        const user = this.state.currentUser[0]
        const price = 80
        if (user.money < price) {
            window.alert('You don\'t have enough money!')
        }else {
            user.money -= price
            const dragonite = { pokename: "Dragonite", 
                          pokeid: 7, 
                          HP: 20, 
                          MaxHP: 30, 
                          Satiety: 10, 
                          MaxSatiety: 10, 
                          Experience: 0, 
                          MaxExperience: 100, 
                          level: 0, 
                          lonliness: 0
                        }

            dragonite.pokeid = this.idGenerator()
            user.pokemon.push(dragonite)

            await api.updateUserById(user.id, user).then((res) => {
                window.alert(`Purchased Success!`)
                this.setState({
                    currentUser: this.state.currentUser[0]
                })
            })

            this.setState({ isLoading: true })

            await api.getAllUsers().then(users => {
                this.setState({
                    users: users.data.data
                })
            })

            const userlist = this.state.users
            userlist.map(u => {
                if (u.isCurrent) {
                    // console.log(u)
                    this.state.currentUser = []
                    this.state.currentUser.push(u)
                    this.setState({
                        currentUser: this.state.currentUser,
                        isLoading: false
                    })
                   
                }
                this.setState({ isLoading: false })
            })
            window.location.reload();
        } 

        
    };

    idGenerator = () => {

      const pokes = this.state.currentUser[0].pokemon
      let result = 1
      let ids = [] 
      pokes.map(p => {
        ids.push(p.pokeid)
      })

      if (ids.length === 0) {
        result += 1
      }

      for (let i = 0; i < ids.length; i++) {
        result += parseInt(ids[i])
      }

      return result

  };

    render() {
        
        return(

            <div>
                <Nav2 state={this.state} style= "margin:0%"/>
                <div className="productPageBody">
                    

                    <div className="inline-pictures" >
                        <div>

                            <img className="div-picture" src={dragonite}></img>
                        </div>


                    </div>

                    <div className="inline-documents">

                        <div id="nameTag-and-priceTag-wrapper">
                            <h5 className="nameTag">Dragonite</h5>
                            <h5 className="priceTag">$80</h5>

                            <div id='intro'>
                                <p>Dragonite is a draconic, bipedal 
                                    Pokémon with light orange skin. 
                                    It has large, grayish-green eyes 
                                    and a round snout with small nostrils. 
                                    A pair of long, thin antennae sprout 
                                    from the top of its head with a small 
                                    horn set between them.</p>
                            </div>
                            
                        </div>
                        <hr id="hr"></hr>
                        <button id="shapeButton" onClick={this.buyPokemon}>
                            <span id = "buy">Buy</span>
                        </button>
                    </div>
                </div>

            </div>
        );
    }

}
export default Dragonite;