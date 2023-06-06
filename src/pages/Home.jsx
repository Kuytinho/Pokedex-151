import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";


export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([])

    const getAllPokemons = () => {
      let endpoints = [];
      for (let i = 1; i <= 151; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
      }
      axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
        setPokemons(res);
        setAllPokemons(res);
      });
    };
    

    const searchPokemons = (search) => {
      if (search === "") {
        getAllPokemons();
      } else {
        const lowercaseSearch = search.toLowerCase(); // Converter o termo de busca para letras minúsculas
        const searchedPokemons = allPokemons.filter((pokemon) =>
          pokemon.data.name.toLowerCase().includes(lowercaseSearch) // Converter os nomes dos pokémons para letras minúsculas e fazer a comparação
    );
        setPokemons(searchedPokemons);
      }
    };

    useEffect(() => {
        getAllPokemons()
      }, []);

    return(
        <div>
          <NavBar search={searchPokemons}/>
          <Container maxWidth={false}>
            <Grid container>
              {pokemons.map((pokemon) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.data.name}>
                  <PokemonCard
                    name={pokemon.data.name}
                    url={pokemon.data.sprites.front_default}
                    id={pokemon.data.id}
                    shinyUrl={pokemon.data.sprites.front_shiny}
                    backUrl={pokemon.data.sprites.back_default}
                    backShiny={pokemon.data.sprites.back_shiny}
                    />
                </Grid >
              ))}      
            </Grid>

          </Container>
          
        </div>
    )
}