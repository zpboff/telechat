package stores

var users []UserEntity

func GetUser(email string) *UserEntity {
	for _, user := range users {
		if user.Email == email {
			return &user
		}
	}

	return nil
}

func SaveUser(user UserEntity) {
	users = append(users, user)
}