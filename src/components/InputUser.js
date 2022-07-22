import {useForm} from "react-hook-form";

function InputUser() {
 const {register, handleSubmit} =useForm();
 const onSubmit = (d) =>
  alert(JSON.stringify(d));

return (
 <form onSubmit={handleSubmit(onSubmit)}>
      <>
      <div>
    <label>
     Enter boat parameters:
    </label>
    </div>
    <div>
    <label>
      Speed:
      <input {...register("boat: speed")} />
    </label>
    </div>
    <div>
    <label>
      Beam:
      <input {...register("boat: beam")} />
    </label>
    </div>
    <div>
    <label>
      Draft:
      <input {...register("boat: draft")} />
    </label>
    </div>
    <div>
    <label>
      Length:
      <input {...register("boat: length")} />
    </label>
    </div>
    <div>
    <label>
    Manoeuvrability:
      <input {...register("boat: manoeuvrability")} />
    </label>
    </div>
    </>

    <input type="submit" value="submit" />
  </form>

);
}

export default InputUser;

