import { useDeleteUser } from "../api-methods/delete-user";
import { useGetUsers } from "../api-methods/get-user";
import type { UserModel } from "../lib/types";
import { UserRow } from "./userrow";

interface UserListProps{
  editUser: UserModel | null;
  onEditClick: (u : UserModel) => void;
  resetUser: () => void;
}

export const UserList = ({onEditClick, editUser, resetUser}: UserListProps) => {
  const {
    data: users,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
    isRefetching: isUsersRefetching,
  } = useGetUsers();

  const { mutate: deleteUaer, isPending: isUserDeleting } = useDeleteUser();

  const handleDelete = (id: number) => {
    //сбросить юзера
    resetUser();

    deleteUaer(id, { onSuccess: onDeleteSuccess });
  };

  const onDeleteSuccess = () => {
    refetchUsers();
  };

  const isListLoading = isUsersLoading || isUsersRefetching;

  return (
    <div className="d-flex flex-column gap-2 p-2 w-50">

        {!isListLoading && (users === undefined || users?.length === 0) && "Нет пользователей" }

      {isListLoading && <div className="align-self-center spinner-grow text-primary"></div>}
      {!isListLoading &&
        users?.map((u, i) => (
          <UserRow
            key={u.id}
            user={u}
            onDeleteClick={handleDelete}
            onEditClick={onEditClick}
            isUserDeleting={isUserDeleting}
            isUserSelected={editUser?.id === u.id}
            line={i+1}
          />
        ))}
    </div>
  );
};
