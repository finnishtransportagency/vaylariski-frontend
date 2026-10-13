export function ValidateSubmitTooltip(selectedWayareaWithNoGDOGID: boolean) {
  return null;
  // return ((formik: object) => {
  //   if (
  //     formik?.values?.navline_angle_params &&
  //     formik.values.navline_angle_params.length > 0
  //   ) {
  //     return (
  //       formik.values.navline_angle_params.filter((row) => !row.GDO_GID)
  //         .length > 0
  //     );
  //   }
  //   return false;
  // })(formik) ||
  //   formik.values.vaylat == null ||
  //   formik.values.vaylat == '' ||
  //   selectedWayareaWithNoGDOGID ? (
  //   <label style={{ fontSize: 14 }}>
  //     <span data-cy-id="submit-button-tooltip-span">
  //       Korjaa seuraavat asiat lähettääksesi arvot:
  //       <br />
  //       {((formik: object) => {
  //         if (
  //           formik?.values?.navline_angle_params &&
  //           formik.values.navline_angle_params.length > 0
  //         ) {
  //           return (
  //             formik.values.navline_angle_params.filter((row) => !row.GDO_GID)
  //               .length > 0
  //           );
  //         }
  //         return false;
  //       })(formik) && (
  //         <>
  //           - Määritä navigointilinjojen valinnaisen parametrin GDO_GID
  //           <br />
  //         </>
  //       )}
  //       {/* When calculation type is navigationline and navigationline is no selected  */}
  //       {(formik.values.vaylat == null || formik.values.vaylat == '') && (
  //         <>- Valitse navigointilinja</>
  //       )}
  //       {/* When calculationtype is navigationline and navigationline is selected BUT there is no GDOGIDS for that navigation line */}
  //       {formik.values.vaylat !== null &&
  //         formik.values.vaylat !== '' &&
  //         selectedWayareaWithNoGDOGID && (
  //           <>- Valitulle väylälle ei löydy navigointilinjoja</>
  //         )}
  //     </span>
  //   </label>
  // ) : null;
}
