import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";

import Label from "../../form/Label";
import Input from "../../form/input/InputField";

import {
  getUsers,
  updateStatus,
  deleteUser,
  updateUser,
} from "../../../services/user.service";

type User = {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  disabled: boolean;
  createdAt: string;
};

export default function BasicTableOne() {
  const [isOpen, setIsOpen] = useState(false);

  const [accounts, setAccounts] = useState<User[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [role, setRole] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const users = await getUsers();

      setAccounts(users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    try {
      await updateUser(selectedUser.uid, {
        displayName: name,
        email,
        role,
      });

      await loadUsers();

      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (user: User) => {
    await updateStatus(user.uid, !user.disabled);

    await loadUsers();
  };

  const handleDelete = async (user: User) => {
    const confirmDelete = window.confirm(`Delete ${user.displayName}?`);

    if (!confirmDelete) return;

    await deleteUser(user.uid);

    await loadUsers();
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Name</TableCell>

              <TableCell isHeader className="text-center">
                Email
              </TableCell>

              <TableCell isHeader className="text-center">
                Role
              </TableCell>

              <TableCell isHeader className="text-center">
                Created
              </TableCell>

              <TableCell isHeader className="text-center">
                Status
              </TableCell>

              <TableCell isHeader className="text-center">
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {accounts.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>{user.displayName}</TableCell>

                <TableCell className="text-center">{user.email}</TableCell>

                <TableCell className="text-center">
                  <Badge
                    size="sm"
                    color={
                      user.role === "Admin"
                        ? "error"
                        : user.role === "Manager"
                          ? "info"
                          : user.role === "Staff"
                            ? "warning"
                            : "light"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>

                <TableCell className="text-center">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-center">
                  <Badge size="sm" color={user.disabled ? "error" : "success"}>
                    {user.disabled ? "Locked" : "Active"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex justify-center gap-3">
                    <Button
                      size="sm"
                      className="w-[80px]"
                      onClick={() => {
                        setSelectedUser(user);

                        setName(user.displayName);

                        setEmail(user.email);

                        setRole(user.role);

                        setIsOpen(true);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      className={`w-[80px] ${
                        user.disabled ? "bg-green-500" : "bg-yellow-500"
                      }`}
                      onClick={() => handleStatus(user)}
                    >
                      {user.disabled ? "Unlock" : "Lock"}
                    </Button>

                    <Button
                      size="sm"
                      className="w-[80px] bg-red-500"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-[500px]"
      >
        <div className="p-6">
          <h4 className="mb-5 text-xl font-semibold">Edit Account</h4>

          <div className="space-y-4">
            <div>
              <Label>Name</Label>

              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label>Email</Label>

              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label>Role</Label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border p-3"
              >
                <option>Admin</option>

                <option>Manager</option>

                <option>Staff</option>

                <option>User</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
