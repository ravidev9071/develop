trigger RecursionTest on Account (before insert) {
insert new account(name='recursion');
}