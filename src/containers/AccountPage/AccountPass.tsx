import React, { useState } from "react";
import Label from "components/Label/Label";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { getAuth, updatePassword } from "firebase/auth";
import Swal from 'sweetalert2';

const AccountPass: React.FC = () => {
  const auth = getAuth();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "New password and confirmed password do not match.", "error");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      updatePassword(user, newPassword).then(() => {
        Swal.fire("Success", "Password updated successfully.", "success");
      }).catch((error) => {
        Swal.fire("Error", "An error occurred while updating the password.", "error");
        console.log(error)
      });
    } else {
      Swal.fire("Error", "No user is currently logged in.", "error");
    }
  };

  return (
    <div>
      <CommonLayout>
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-3xl font-semibold">Update your password</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="max-w-xl space-y-6">
            <div>
              <Label>Current password</Label>
              <Input 
                type="password" 
                className="mt-1.5" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>New password</Label>
              <Input 
                type="password" 
                className="mt-1.5" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>Confirm password</Label>
              <Input 
                type="password" 
                className="mt-1.5" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="pt-2">
              <ButtonPrimary onClick={handleUpdatePassword}>
                Update password
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;
