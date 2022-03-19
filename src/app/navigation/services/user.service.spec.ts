import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { User, UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockUsers: User[] = [
    {
      id: 1,
      email: 'test@test',
      password: '12345678',
      username: 'test@test',
      friends: [2],
      favoriteGames: [],
    },
    {
      id: 2,
      email: 'tes@tes',
      password: '12345678',
      username: 'tes@tes',
      friends: [1],
      favoriteGames: [],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientModule],
    });
    service = TestBed.inject(UserService);
  });

  it('should create User Service', () => {
    expect(service).toBeDefined();
  });

  it('should get user by id', () => {
    service
      .getUser(1)
      .subscribe((user) => expect(user.id).toEqual(mockUsers[0].id));
  });

  it('should get user by email', () => {
    const mockEmail = 'test@test';
    service
      .getUserByEmail(mockUsers[0].email)
      .subscribe((user) => expect(user[0].email).toEqual(mockEmail));
  });

  it('should get users', () => {
    service.getUsers().subscribe((users) => expect(users).toEqual(mockUsers));
  });

  it('should add user', () => {
    const mockUser: User = {
      id: 2,
      email: 'a@a',
      password: '12345678',
      username: 'a@a',
      friends: [],
      favoriteGames: [],
    };
    service
      .addUser(mockUser)
      .subscribe((data) => expect(data).toEqual(mockUser));
  });

  it('should update user', () => {
    let mockUser: User[] = [
      {
        id: 1,
        email: 'test@test',
        password: '12345678',
        username: 'test@test',
        friends: [2, 3],
        favoriteGames: [],
      },
    ];
    service
      .updateUser(mockUsers[0].id, mockUsers[0])
      .subscribe((data) =>
        expect(data.friends.push(3)).toEqual(mockUser[0].friends.length)
      );
  });
});
