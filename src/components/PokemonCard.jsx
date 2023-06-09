import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PokemonCard({name, url, id, shinyUrl, backUrl, backShiny}) {
  const [shiny, setShiny] = React.useState(false);
  const [front, setFront] = React.useState(true)

  const imgUrl = () => {
    if (shiny && front) {
      return shinyUrl;
    } else if (shiny && !front) {
      return backShiny;
    } else if (!shiny && front) {
      return url;
    } else {
      return backUrl;
    }
  };

  const shinyImage = () => {
    setShiny(true)
  }

  const regularImage = () => {
    setShiny(false)
  }

  const frontImage = () => {
    setFront(true);
  };

  const backImage = () => {
    setFront(false);
  };

  const nomeMaiusculo = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        textAlign: "center",
        marginBottom: '2em',
        marginRight: '1em',
        backgroundColor: '#E8AE68',
        '&:hover': {
          backgroundColor: '#FFD275',
        },
    }}

  >
      <CardMedia
        component="img"
        alt={name}
        height="240"
        image={imgUrl()}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {`${id} - ${nomeMaiusculo(name)}` }
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography> */}
      </CardContent>
        <CardActions>
        <Button
          onClick={regularImage}
          disabled={!shiny ? true : false}
          size="small"
          sx={{
            color: 'black',
            '&:disabled': {
              backgroundColor: '#02182B',
              color: 'white',
            },
          }}
          >
            Regular
        </Button>
        <Button
          onClick={shinyImage}
          disabled={shiny ? true : false}
          size="small"
          sx={{
            color: 'black',
            '&:disabled': {
              backgroundColor: '#02182B',
              color: 'white',
            },
          }}
          >
            Shiny
        </Button>
        <span style={{ margin: '0 0.5em' }}>|</span>
        <Button
          onClick={frontImage}
          disabled={front ? true : false}
          size="small"
          sx={{
            color: 'black',
            '&:disabled': {
              backgroundColor: '#02182B',
              color: 'white',
            },
          }}
          >
            Front
        </Button>
        <Button
          onClick={backImage}
          disabled={!front ? true : false}
          size="small"
          sx={{
            color: 'black',
            '&:disabled': {
              backgroundColor: '#02182B',
              color: 'white',
            },
          }}
          >
            Back
        </Button>
      </CardActions>
    </Card>
  );
}