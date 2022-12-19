import { Box, Button, Grid, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import ParameterTabsComponent from "components/ParameterTabsComponent";
import UserInputContext from "contexts/UserInput";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";

{
  /* Käyttäjän voi halutessaan ylikirjottaa kannassa lasketut SADE, BEND_ANGLE, S_BEND arvot antamilleen navigointilinjoille (GDO_GID) */
}
export default function UserDefinedAngleParamsComponent(props) {
  const { children, tabValue, tabIndex, ...other } = props;
  const [elementId, setElementId] = useState(1);
  const [elements, setElements] = useState([
    {
      GDO_GID: "",
      SADE: "",
      S_BEND: "",
      BEND_ANGLE: "",
      id: 0,
    },
  ]);
  const { userInput, setUserInput } = useContext(UserInputContext);


  const handleAddFieldButtonClick = () => {
    const elid = elementId;
    setElements([
      ...elements,
      {
        GDO_GID: "",
        SADE: "",
        S_BEND: "",
        BEND_ANGLE: "",
        id: elid,
      },
    ]);
    setElementId(elementId + 1);
  };
  const removeElement = (id) => {
    console.log("poista", id);
    const newList = elements.filter((el) => el.id !== id);
    setElements(newList);
  };

  const handleElementChange = (ev, newidx) => {
    const newValue = ev.target.value;
    console.log(
      "changed id:",
      ev.target.name,
      "idx",
      newidx,
      "Value",
      newValue
    );
    const newList = elements.map((item, id) => {
      if (id === newidx) {
        const updatedItem = {
          ...item,
          [ev.target.name]: newValue,
        };

        return updatedItem;
      }
      return item;
    });
    setElements(newList);
  };

  useEffect(() => {
    console.log(elements);
  }, [elements]);

  return (
    <div
      role="TabPanelComponent"
      hidden={tabValue !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
      {...other}
    >
      {tabValue === tabIndex && (
        <Grid>
          <Button
            variant="contained"
            onClick={handleAddFieldButtonClick}
          >
            Lisää navigointilinja
          </Button>
          {elements.map((el, idx) => (
            <Stack
              direction="row"
              spacing={1}
              key={el.id}
              // {...register("userInput.navilinja_angle_params")}
            >
              <TextField
                required
                name="GDO_GID"
                label="GDO_GID"
                type="number"
                // value={userInput.navilinja_angle_params.index.GDO_GID}
                // onChange={(ev) => handleElementChange(ev, idx)}

              />
              <TextField
                name="SADE"
                label="Säde"
                type="number"
                // value={userInput.navilinja_angle_params.index.SADE}
                onChange={(ev) => handleElementChange(ev, idx)}
              />
              <TextField
                name="BEND_ANGLE"
                label="Kaarteen kulma"
                type="number"
                // value={userInput.navilinja_angle_params.index.BEND_ANGLE}
                onChange={(ev) => handleElementChange(ev, idx)}
              />
              <TextField
                name="S_BEND"
                label="S-mutkan pituus"
                type="number"
                // value={userInput.navilinja_angle_params.index.S_BEND}
                onChange={(ev) => handleElementChange(ev, idx)}
              />
              <Button onClick={() => removeElement(idx)}>Poista</Button>
            </Stack>
          ))}
        </Grid>
      )}
    </div>
  );
}

UserDefinedAngleParamsComponent.propTypes = {
  register: PropTypes.func,
  children: PropTypes.node,
  tabIndex: PropTypes.number.isRequired,
  tabValue: PropTypes.number.isRequired,
};
