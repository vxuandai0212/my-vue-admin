declare namespace Auth {
  type RoleType = "super" | "admin" | "user"

  interface UserInfo {
    userId: string
    userName: string
    userRole: RoleType
  }
}

declare namespace UserManagement {
  interface User extends ApiUserManagement.User {
    index: number
    key: string
  }

  type GenderKey = NonNullable<User["gender"]>

  type UserStatusKey = NonNullable<User["userStatus"]>
}
