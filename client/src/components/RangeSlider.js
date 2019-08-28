import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


const useStyles = makeStyles({
  root: {
    width: "100%"
  },
});

function valuetext(value) {
  return `${value}`;
}

const RangeSlider = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {props.name}
      </Typography>
      <Slider
        value={props.value}
        min={props.min}
        max={props.max}
        onChange={ (event, newValue) => props.handleChange(props.name.toLowerCase(), newValue)}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  )
}

export default RangeSlider
