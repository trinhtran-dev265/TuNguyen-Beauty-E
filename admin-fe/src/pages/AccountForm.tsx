import { useState } from "react";

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";

import { createUser } from "../services/user.service";

export default function AccountForm() {
  const [displayName, setDisplayName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("Staff");

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!displayName || !email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");

      return;
    }

    try {
      setLoading(true);

      await createUser({
        displayName,
        email,
        password,
        role,
      });

      alert("Tạo tài khoản thành công");

      setDisplayName("");
      setEmail("");
      setPassword("");
      setRole("Staff");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Có lỗi xảy ra");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta title="Create Account" description="Create Account" />

      <PageBreadcrumb pageTitle="Create Account" />

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Account Information</h3>

          <p className="mt-1 text-sm text-gray-500">Create new account</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <Label>Full Name</Label>

            <Input
              type="text"
              placeholder="Trần Lê Tú Tâm"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div>
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="tam@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label>Password</Label>

            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Label>Role</Label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800"
            >
              <option>Admin</option>

              <option>Manager</option>

              <option>Staff</option>

              <option>User</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setDisplayName("");
              setEmail("");
              setPassword("");
              setRole("Staff");
            }}
          >
            Cancel
          </Button>

          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </div>
    </>
  );
}
