import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import throttle from 'lodash/throttle';

import types from './filter_mockdata';
import './Autocomplete.scss';

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function LocationFilter(props) {
  const { onSelect, appValue } = props;
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    setOptions(types);
    setValue(appValue);
    setInputValue(appValue);
  }, [appValue]);

  const onInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    setValue(newInputValue);
  };

  return (
    <Autocomplete
      id='type'
      className='autocomplete'
      getOptionLabel={(option) => option}
      filterOptions={(x) => {
        return x;
      }}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={async (event, newValue) => {
        await onSelect(event, newValue);
      }}
      onInputChange={(event, newInputValue) =>
        onInputChange(event, newInputValue)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label='Find by type'
          variant='outlined'
          value={inputValue}
          fullWidth
        />
      )}
      renderOption={(option) => {
        let matches = [];
        matches.push(option.name);

        return (
          <Grid container alignItems='center'>
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item>
              {matches.map((part, index) => (
                <span key={index} style={{ fontWeight: 400 }}>
                  {part}
                </span>
              ))}

              <Typography variant='body2' color='textSecondary'>
                {option.name}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
