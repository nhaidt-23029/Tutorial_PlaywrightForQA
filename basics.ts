    //khai báo biến
    const usernam : string ='nhaidt';
    let age : number = 30;
    const isActive : boolean = true;
    const roles : string[] = ['user', 'member','Admin'];

    //khai báo object user
    const user :{
        name : string;
        email : string;
        isAdmin: boolean
    } = {
        name : 'nhaidt',
        email : 'nhaidt@gmail.com',
        isAdmin : true,
    };

    //print user infor
    console.log(`User: ${JSON.stringify(user)} (email: ${user.email}), Roles: ${roles.join(", ")}, Active: ${isActive}`);

    //checkage
    function checkAge(age_param: number): void {
        if (age_param >= 18) {
            console.log("Adult");
        } else {
            console.log("Under 18");
        }
    }

    checkAge(10);