import { useState } from 'react';

import { Angle } from '../../../../types/Angle.ts';
import useBackend from '../../../../services/Backend/useBackend.ts';
import { useWayarea } from '../../../../contexts/NewWayareaContext.tsx';
import { RivResult } from '../../../../types/RivResult.ts';
import { RivResultProperties } from '../../../../types/RivResultProperties.ts';

export default function useOverrideTab() {
  const newAngle: Angle = {
    GDO_GID: '',
    SADE: '',
    S_BEND: '',
    BEND_ANGLE: '',
  };

  const {} = useBackend();
  const { selected: selectedWayarea } = useWayarea();
  const [selectedGDO_GIDs, setSelectedGDO_GIDs] = useState<number[]>([]);

  const [textFieldHasContent, setTextFieldHasContent] = useState<
    RivResultProperties[]
  >([]);
  const [allGDOGIDs, setAllGDOGIDs] = useState<number[]>([]);

  // function handleMenuItemClick(newValue?: number, index: number) {
  //   formik.setFieldValue(`navline_angle_params.${index}.GDO_GID`, newValue);
  //   setSelectedGDO_GIDs((prevSelectedGDO_GIDs) => {
  //     const updatedSelectedGDO_GIDs = [...prevSelectedGDO_GIDs];
  //     updatedSelectedGDO_GIDs[index] = newValue;
  //     return updatedSelectedGDO_GIDs;
  //   });
  // }
  // function handleRemoveRow(index) {
  //   const updatedSelectedGDO_GIDs = selectedGDO_GIDs.filter(
  //     (_row, i) => i !== index
  //   );
  //   setSelectedGDO_GIDs(updatedSelectedGDO_GIDs);
  //   const updatedNavlineAngleParams = formik.values.navline_angle_params.filter(
  //     (_row, i) => i !== index
  //   );
  //   formik.setFieldValue('navline_angle_params', updatedNavlineAngleParams); // Update formik values
  // }

  // async function updateSelectedWayarea() {
  //   if (selectedWayarea) {
  //     const gdo_gids: number[] = await fetchGdoGidsForVaylat(selectedWayarea.VAYLAT);
  //     if (!gdo_gids.length) {
  //       setAllGDOGIDs([]);
  //     } else {
  //       setAllGDOGIDs(gdo_gids);
  //     }

  //   }
  // }

  // function updateNavlineParameters() {
  //   // Initialize the state with an array of objects, each representing a TextField
  //   setTextFieldHasContent(
  //     formik.values.navline_angle_params.map((el) => ({
  //       SADE: el.SADE !== '',
  //       BEND_ANGLE: el.BEND_ANGLE !== '',
  //       S_BEND: el.S_BEND !== '',
  //     }))
  //   );
  // }, [formik.values.navline_angle_params]);

  // // Function to handle text changes in the TextField and update the icon state
  // function handleTextFieldChange(index, fieldName, value) {
  //   setTextFieldHasContent((prevTextFieldHasContent) => {
  //     const updatedTextFieldHasContent = [...prevTextFieldHasContent];
  //     updatedTextFieldHasContent[index][fieldName] = value !== '';
  //     return updatedTextFieldHasContent;
  //   });
  // }

  return {
    newAngle,
    allGDOGIDs,
    selectedWayarea,
    selectedGDO_GIDs,
    textFieldHasContent,
    handleMenuItemClick: (newValue?: number, index?: number) => {},
    handleRemoveRow: (index: number) => {},
    updateSelectedWayarea: () => {},
    updateNavlineParameters: () => {},
    handleTextFieldChange: (index: any, fieldName: any, value: any) => {},
  };
}
