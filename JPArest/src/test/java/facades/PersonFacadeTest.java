package facades;

import DTO.PersonDTO;
import DTO.PersonsDTO;
import entities.Address;
import utils.EMF_Creator;
import entities.Person;
import exceptions.MissingInputException;
import exceptions.PersonNotFoundException;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import static org.hamcrest.CoreMatchers.everyItem;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.hasProperty;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

//Uncomment the line below, to temporarily disable this test
//@Disabled
public class PersonFacadeTest {

    private static EntityManagerFactory emf;
    private static PersonFacade facade;
    
    private Person p1;
    private Person p2;
    private Person p3;
    

    public PersonFacadeTest() {
    }

    @BeforeAll
    public static void setUpClass() {
        emf = EMF_Creator.createEntityManagerFactoryForTest();
        facade = PersonFacade.getPersonFacade(emf);
    }

    @AfterAll
    public static void tearDownClass() {
//        Clean up database after test is done or use a persistence unit with drop-and-create to start up clean on every test
    }

    // Setup the DataBase in a known state BEFORE EACH TEST
    //TODO -- Make sure to change the script below to use YOUR OWN entity class
    @BeforeEach
    public void setUp() {
        EntityManager em = emf.createEntityManager();
        
        p1 = new Person("Claes", "Lindholm", "123456");
        p1.setAddress(new Address("Kildeskovsvej 53", 2820, "Gentofte"));
        p2 = new Person("Hans", "Jensen", "789123");
        p2.setAddress(new Address("Lyngfeldtsvej 11", 3300, "Frederiksværk"));
        p3 = new Person("Kurt", "Vonnegut", "654321");
        p3.setAddress(new Address("Harsdorffsvej 12", 1834, "Frederiksberg"));
        try {
            em.getTransaction().begin();
            em.createNamedQuery("Person.deleteAllRows").executeUpdate();
            em.createNamedQuery("Address.deleteAllRows").executeUpdate();
            em.persist(p1);
            em.persist(p2);
            em.persist(p3);

            em.getTransaction().commit();
        } finally {
            em.close();
        }
    }

    @AfterEach
    public void tearDown() {
//        Remove any data after each test was run
    }

    // TODO: Delete or change this method 
    @Test
    public void testPersonCount() {
        assertEquals(3, facade.getPersonCount(), "Expects three rows in the database");
    }
    
    @Test
    public void testGetAllPersons() {
        PersonsDTO result = facade.getAllPersons();
        int expResult = 3;
        assertEquals(expResult,facade.getPersonCount(),"Expects 3 persons in db");
        assertEquals(expResult, result.getAll().size());
        assertThat(result.getAll(),everyItem(hasProperty("fName")));
    }
    
    @Test
    public void testGetPerson() throws PersonNotFoundException {
        PersonDTO pdto = facade.getPerson(p2.getId());
        assertEquals("Hans",pdto.getfName());
        
    }
    /*
    @Test
    public void testDeletePerson() throws PersonNotFoundException{
        int id;
        id = p1.getId();
        PersonDTO expResult = new PersonDTO(p1);
        PersonDTO result = facade.deletePerson(id);
        assertEquals(expResult, result);
    }*/
        @Test
    public void testEditPerson() throws PersonNotFoundException, MissingInputException {
        PersonDTO p = new PersonDTO(p3);

        PersonDTO expResult = new PersonDTO(p3);
        expResult.setfName("John");
        p.setfName("John");
        PersonDTO result = facade.editPerson(p);
        assertEquals(expResult.getfName(), result.getfName());
    }
    
    @Test
    public void testAddPerson() throws MissingInputException {

        String fName = "Gustav";
        String lName = "Svendsen";
        String phone = "6666";
        String street = "Stockholmsgade 12";
        int zip = 2100;
        String city = "Østerbro";

        PersonDTO result = facade.addPerson(fName, lName, phone, street, zip, city);
        PersonDTO expResult = new PersonDTO(fName, lName, phone, street, zip, city);
        expResult.setId(expResult.getId());
        assertEquals(expResult.getfName(), result.getfName());
        assertEquals(expResult.getlName(), result.getlName());
        assertEquals(expResult.getPhone(), result.getPhone());
    }

}
