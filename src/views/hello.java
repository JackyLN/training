
public class Hello {
  public static void main(String args[]) {
    System.out.println("Hello Chi");
    System.out.prinln("Today is my birthday");

    int z, y, temp;
    System.out.println("Enter z and y");
    Scanner sct = new Scanner(System.in);   //User inputs two numbers
    z = sct.nextInt();   //User inputs two numbers
    y = sct.nextInt();
    System.out.println("Before Swapping\nz = "+z+"\ny = "+y);
    temp = z;   //Swapping is done
    z = y;
    y = temp;
    System.out.println("After Swapping\nz = "+z+"\ny = "+y);

  }
}

