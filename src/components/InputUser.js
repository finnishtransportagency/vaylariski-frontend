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
      Manoeuvrability:
      <input {...register("Manoeuvrability")} />
    </label>
    </div>
    <div>
    <label>
      Speed:
      <input {...register("Boat Speed")} />
    </label>
    </div>
    <div>
    <label>
      Length:
      <input {...register("Boat Length")} />
    </label>
    </div>
    <div>
    <label>
      Beam:
      <input {...register("Boat Beam")} />
    </label>
    </div>
    <div>
    <label>
      Draft:
      <input {...register("Boat Draft")} />
    </label>
    </div>
    </>

    <input type="submit" value="submit" />
  </form>

);
}

export default InputUser;