import Filter from "../components/Filter";
import Table from "../components/Table";
import MaxWidthWrapper from "../components/utilities/MaxWidthWrapper";

const HomePage = () => {
  return (
    <main>
      <section className="mt-5 lg:mt-[67px] mb-5 lg:mb-[54px] px-5">
        <MaxWidthWrapper>
          <h1 className="text-2xl lg:text-[40px] lg:leading-[48px] tracking-[0.75px] font-bold">
            Student Data Table
          </h1>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <Filter />
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <Table />
        </MaxWidthWrapper>
      </section>
    </main>
  );
};

export default HomePage;
