import type { UserModel } from "../lib/types";


const PATH = "/resume-pdf/";

interface UserRowProps {
  line: number;
  user: UserModel;
  onDeleteClick: (id: number) => void;
  onEditClick: (user: UserModel) => void;
  isUserDeleting: boolean;
  isUserSelected: boolean;
}

export const UserRow = ({
  line,
  user,
  onDeleteClick,
  onEditClick,
  isUserDeleting,
  isUserSelected,
}: UserRowProps) => {
  return (
    <div
      style={{
        backgroundColor: !isUserSelected
          ? "rgb(219, 227, 228)"
          : "rgb(115, 204, 192)",
      }}
      className="d-flex flex-row gap-3  shadow p-2 rounded-3 ps-4 justify-content-between"
    >
      <div className="d-flex flex-row gap-2  w-100 ">
        <span style={{ width: "30px" }}>{line}</span>

        <span className="fw-bold" style={{ width: "170px" }}>
          {user.firstName + " " + user.lastName}
        </span>

        <span style={{ width: "50px" }}>{user.age}</span>

        <span style={{ width: "120px" }}>{user.phone}</span>

        {user.isCitizen ? (
          <span className="text-success text-nowrap">Гражданин РФ</span>
        ) : (
          <span className="text-primary ">Иностранец</span>
        )}
      </div>


      {!isUserDeleting && (
        <div 
           onClick={() => {window.open(PATH + user.resume, "_blank")}} style={{ cursor: "pointer" }}>
          📋
        </div>
      )}      
      
      {!isUserDeleting && (
        <div onClick={() => onEditClick(user)} style={{ cursor: "pointer" }}>
          ✏️
        </div>
      )}

      {!isUserDeleting && (
        <button
          onClick={() => onDeleteClick(user.id)}
          className="btn btn-close"
        ></button>
      )}
    </div>
  );
};
