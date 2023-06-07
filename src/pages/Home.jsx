import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import Button from '@mui/material/Button';


export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([])
    const [page, setPage] = useState(1)
    const [backDisable, setBackDisable] = useState(true)
    const [nextDisable, setNextDisable] = useState(true)

    const cardsPerPage = 40;

    const getAllPokemons = () => {
      let endpoints = [];
      for (let i = 1; i <= 494; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
      }
      axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
        setAllPokemons(res);
      });
    };

    const loadNextPage = () => {
      setPage(page + 1);
    };

    const loadPageBefore = () => {
      setPage(page - 1);
    };

    const getAllPokemonsPerPage = () => {
      let endpoints = [];
      for (let i = (page - 1) * cardsPerPage + 1; i <= page * cardsPerPage; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
      }

      axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
        setPokemons(res);
      });
    };  
   

    const searchPokemons = (search) => {
      if (search === "") {
        getAllPokemonsPerPage();
      } else {
        const lowercaseSearch = search.toLowerCase(); // Converter o termo de busca para letras minúsculas
        const searchedPokemons = allPokemons.filter((pokemon) =>
          pokemon.data.name.toLowerCase().includes(lowercaseSearch) // Converter os nomes dos pokémons para letras minúsculas e fazer a comparação
    );
        setPokemons(searchedPokemons);
      }
    };

    useEffect(() => {
        getAllPokemons();

        const getAllPokemonsPerPage = () => {
          let endpoints = [];
          for (let i = (page - 1) * cardsPerPage + 1; i <= (page * cardsPerPage > 494? 494 : page * cardsPerPage); i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
          }
          axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
            setPokemons(res);
          });
        };
        getAllPokemonsPerPage();

        const backDisabled = () => {
          if (page === 1) {
            setBackDisable(true);
          } else {
            return setBackDisable(false)
          }
        }
        backDisabled()

        const nextDisabled = () => {
          if (page === 13) {
            setNextDisable(true);
          } else {
            return setNextDisable(false)
          }
        }
        nextDisabled()        
      }, [page]);

    return(
        <div>
          <NavBar search={searchPokemons}/>
          <Container maxWidth={false}>
            <Button disabled={backDisable} onClick={loadPageBefore} variant="contained">Back</Button>
            <Button disabled={nextDisable}  onClick={loadNextPage} variant="contained">Next</Button>
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